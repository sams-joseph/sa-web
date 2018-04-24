import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import compose from 'recompose/compose';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableHead, TableCell, TableFooter, TablePagination, TableRow } from 'material-ui/Table';
import ZoomIn from 'material-ui-icons/ZoomIn';
import Paper from 'material-ui/Paper';
import TablePaginationActions from './TablePaginationActions';
import { Container, SubHeading, SectionIcon } from './Styled';

import HistorySvg from './images/history-icon.svg';

let counter = 0;
function createData(orderNumber, shipTo, creationDate) {
  counter += 1;
  return {
    id: counter,
    orderNumber,
    orderLink: <Link to={`/order/${orderNumber}`}>{orderNumber}</Link>,
    shipTo,
    creationDate,
    action: (
      <IconButton component={Link} to={`/order/${orderNumber}`}>
        <ZoomIn />
      </IconButton>
    ),
  };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  orderCell: {
    width: '100px',
  },
  createdCell: {
    width: '200px',
  },
  actionCell: {
    width: '50px',
  },
});

class PaginatedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: this.props.rowsPerPage,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, orderHistory, subHeading } = this.props;
    const { rowsPerPage, page } = this.state;
    const data = orderHistory
      .map(order => createData(order.id + 100000, order.shippingName, order.createdAt))
      .sort((a, b) => (a.orderNumber > b.orderNumber ? -1 : 1));
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Container>
        {subHeading && (
          <SubHeading>
            <SectionIcon src={HistorySvg} alt="Order History" /> Order History
          </SubHeading>
        )}
        <Paper className={classes.root} elevation={0}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.orderCell}>Order Number</TableCell>
                  <TableCell>Shipped To</TableCell>
                  <TableCell numeric>Created On</TableCell>
                  <TableCell numeric>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const date = moment(n.creationDate).format('MMM DD YYYY');
                  return (
                    <TableRow className={classes.row} key={n.id}>
                      <TableCell className={classes.orderCell}>{n.orderLink}</TableCell>
                      <TableCell>{n.shipTo}</TableCell>
                      <TableCell numeric className={classes.createdCell}>
                        {date}
                      </TableCell>
                      <TableCell numeric className={classes.actionCell}>
                        {n.action}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={4}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    Actions={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </Container>
    );
  }
}

const { shape, arrayOf } = PropTypes;
PaginatedTable.propTypes = {
  classes: shape({}).isRequired,
  orderHistory: arrayOf(shape({}).isRequired).isRequired,
};

function mapStateToProps(state) {
  return {
    orderHistory: state.orderHistory,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(PaginatedTable);

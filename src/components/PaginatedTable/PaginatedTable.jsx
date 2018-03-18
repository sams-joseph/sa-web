import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableHead, TableCell, TableFooter, TablePagination, TableRow } from 'material-ui/Table';
import ZoomIn from 'material-ui-icons/ZoomIn';
import Paper from 'material-ui/Paper';
import TablePaginationActions from './TablePaginationActions';

let counter = 0;
function createData(orderNumber, creationDate) {
  counter += 1;
  return { id: counter, orderNumber, creationDate, action: <ZoomIn /> };
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
});

class PaginatedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [
        createData('Cupcake', 305),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, orderHistory } = this.props;
    const { rowsPerPage, page } = this.state;
    const data = orderHistory
      .map(order => createData(order.id + 100000, order.createdAt))
      .sort((a, b) => (a.orderNumber > b.orderNumber ? -1 : 1));
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} elevation={0}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell numeric>Created On</TableCell>
                <TableCell numeric>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const date = moment(n.creationDate).format('MMM DD YYYY');
                return (
                  <TableRow className={classes.row} key={n.id}>
                    <TableCell>{n.orderNumber}</TableCell>
                    <TableCell numeric>{date}</TableCell>
                    <TableCell numeric>{n.action}</TableCell>
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
                  colSpan={3}
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

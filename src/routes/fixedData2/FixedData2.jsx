import React from 'react';
import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import mock_data from '../../mocks/MOCK_DATA.js';
// import { Col } from 'react-flexbox-grid';

// const toTitle = key => {
//   return key
//     .split('_')
//     .map(word => {
//       return word.charAt(0).toUpperCase() + word.substr(1, word.length - 1);
//     })
//     .join(' ');
// };

// const mockColumns = Object.keys(mock_data[0]).map(key => ({
//   key: key,
//   title: toTitle(key),
// }));

// const mockColumnFixed = [
//   'first_name', 'last_name'
// ]

function MyHeaderCell({ label }) {
  return <Cell>{label}</Cell>;
}

function MyTextCell({ rowIndex, field, data, ...rest }) {
  return <Cell {...rest}>{data[rowIndex][field]}</Cell>;
}

function MyCollapseCell({
  data,
  rowIndex,
  columnKey,
  callback,
  collapsedRows,
  ...rest
}) {
  return (
    <Cell {...rest}>
      <span onClick={() => callback(rowIndex)}>
        {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
      </span>
    </Cell>
  );
}

function MySubTable({ data }) {
  const letters = data.split('').map(letter => {
    return { letter: letter };
  });
  const height = data.length * 40 + 40 + 2;
  return (
    <Table
      rowHeight={40}
      headerHeight={40}
      rowsCount={data.length}
      width={200}
      height={height}
    >
      <Column
        key="letter"
        header={<MyHeaderCell label="Car Model Letters" />}
        cell={<MyTextCell data={letters} field="letter" />}
        columnKey="letter"
        width={200}
        flexGrow={1}
      />
    </Table>
  );
}

function ExpandedRow({ rowData, width, height }) {
  const style = {
    width: width - 2,
    height: height,
  };

  const expandStyles = {
    backgroundColor: 'white',
    border: '1px solid #d3d3d3',
    boxSizing: 'border-box',
    padding: '20px',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  };

  return (
    <div style={style}>
      <div style={expandStyles}>
        <MySubTable data={rowData.car_model} />
      </div>
    </div>
  );
}

class MyTable extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: mock_data,
      columnWidths: {
        first_name: 200,
        last_name: 200,
      },
      expandedRows: new Set(),
    };
  }

  onColumnResizeEnd = (newWidth, key) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: { ...columnWidths, [key]: newWidth },
    }));
  };

  onCollapseClick = rowIndex => {
    const shallowCopyOfExpandedRows = new Set([...this.state.expandedRows]);
    // let scrollToRow = rowIndex;
    if (shallowCopyOfExpandedRows.has(rowIndex)) {
      shallowCopyOfExpandedRows.delete(rowIndex);
      // scrollToRow = null
    } else {
      shallowCopyOfExpandedRows.add(rowIndex);
    }

    this.setState({
      // scrollToRow: scrollToRow,
      expandedRows: shallowCopyOfExpandedRows,
    });
  };

  expandedRowGetter = ({ rowIndex, width, height }) => {
    // This method is called every time the table scrolls vertically, even just by 1 pixel
    if (!this.state.expandedRows.has(rowIndex)) {
      return null;
    }

    return (
      <ExpandedRow
        rowData={this.state.rows[rowIndex]}
        width={width}
        height={height}
      />
    );
  };

  subRowHeightGetter = index => {
    const subRowHeight =
      this.state.rows[index].car_model.length * 40 + 40 + 40 + 3;
    return this.state.expandedRows.has(index) ? subRowHeight : 0;
  };

  render() {
    return (
      <Table
        rowHeight={40}
        headerHeight={40}
        groupHeaderHeight={40}
        rowsCount={this.state.rows.length}
        subRowHeightGetter={this.subRowHeightGetter}
        width={1400}
        height={700}
        rowExpanded={this.expandedRowGetter}
        onColumnResizeEndCallback={this.onColumnResizeEnd}
        isColumnResizing={false}
        {...this.props}
      >
        <ColumnGroup fixed={true} header={<MyHeaderCell label="" />}>
          <Column
            cell={
              <MyCollapseCell
                callback={this.onCollapseClick}
                collapsedRows={this.state.expandedRows}
              />
            }
            fixed={true}
            width={30}
          />
        </ColumnGroup>
        <ColumnGroup fixed={true} header={<MyHeaderCell label="Identity" />}>
          <Column
            key="first_name"
            header={<MyHeaderCell label="First Name" />}
            cell={<MyTextCell data={this.state.rows} field="first_name" />}
            columnKey="first_name"
            width={this.state.columnWidths['first_name']}
            isResizable={true}
            fixed={true}
          />
          <Column
            key="last_name"
            header={<MyHeaderCell label="Last Name" />}
            cell={<MyTextCell data={this.state.rows} field="last_name" />}
            columnKey="last_name"
            width={this.state.columnWidths['last_name']}
            isResizable={true}
            fixed={true}
          />
        </ColumnGroup>
        <ColumnGroup header={<MyHeaderCell label="Contact Info" />}>
          <Column
            key="email"
            header={<MyHeaderCell label="Email" />}
            cell={<MyTextCell data={this.state.rows} field="email" />}
            columnKey="email"
            width={200}
          />
          <Column
            key="username"
            header={<MyHeaderCell label="Username" />}
            cell={<MyTextCell data={this.state.rows} field="username" />}
            columnKey="username"
            width={200}
          />
        </ColumnGroup>
        <ColumnGroup header={<MyHeaderCell label="Car Info" />}>
          <Column
            key="car_make"
            header={<MyHeaderCell label="Make" />}
            cell={<MyTextCell data={this.state.rows} field="car_make" />}
            columnKey="car_make"
            width={200}
          />
          <Column
            key="car_model"
            header={<MyHeaderCell label="Model" />}
            cell={<MyTextCell data={this.state.rows} field="car_model" />}
            columnKey="car_model"
            width={200}
          />
          <Column
            key="car_year"
            header={<MyHeaderCell label="Year" />}
            cell={<MyTextCell data={this.state.rows} field="car_year" />}
            columnKey="car_year"
            width={200}
          />
          <Column
            key="car_color"
            header={<MyHeaderCell label="Color" />}
            cell={<MyTextCell data={this.state.rows} field="car_color" />}
            columnKey="car_color"
            width={200}
          />
        </ColumnGroup>
      </Table>
    );
  }
}

export default MyTable;

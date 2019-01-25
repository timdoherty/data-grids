import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import mock_data from '../../mocks/MOCK_DATA.js';

function MyHeaderCell({ label }) {
  return <Cell>{label}</Cell>;
}

function MyTextCell({ rowIndex, field, data, ...rest }) {
  return <Cell {...rest}>{data[rowIndex][field]}</Cell>;
}

class MyTable extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: mock_data,
    };
  }

  render() {
    return (
      <Table
        rowsCount={this.state.rows.length}
        rowHeight={40}
        width={1000}
        height={500}
      >
        <Column
          header={<MyHeaderCell label="First Name" />}
          cell={<MyTextCell data={this.state.rows} field="first_name" />}
          width={200}
        />
        <Column
          header={<MyHeaderCell label="Last Name" />}
          cell={<MyTextCell data={this.state.rows} field="last_name" />}
          width={200}
        />
      </Table>
    );
  }
}

export default MyTable;

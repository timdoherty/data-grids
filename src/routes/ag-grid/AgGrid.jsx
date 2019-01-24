import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { Icon } from '@procore/core-react';

import mockData from '../../mocks/MOCK_DATA';

class AgGrid extends Component {
  constructor() {
    super();
    this.state = {
      groupBy: [],
    };
    this.allExpanded = false;
  }

  onGroupByChanged = event => {
    this.setState({ groupBy: event.target.value });
  };

  onGridReady = params => {
    this.api = params.api;
  };

  render() {
    const columns = [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'first_name',
        headerName: 'First Name',
      },
      {
        field: 'last_name',
        headerName: 'Last Name',
      },
      {
        field: 'email',
        headerName: 'Email',
      },
      {
        field: 'phone',
        headerName: 'Phone #',
      },
      {
        field: 'car_make',
        headerName: 'Car Make',
      },
      {
        field: 'car_model',
        headerName: 'Car Model',
      },
      {
        field: 'car_year',
        headerName: 'Car Year',
      },
      {
        field: 'car_color',
        headerName: 'Car Color',
      },
      {
        field: 'country',
        headerName: 'Country',
      },
      {
        field: 'date',
        headerName: 'Date',
      },
      {
        field: 'username',
        headerName: 'Username',
      },
      {
        field: 'description',
        headerName: 'Description',
      },
      {
        field: 'amount',
        headerName: 'Amount',
      },
      {
        field: 'buzzword',
        headerName: 'Buzzword',
      },
      {
        field: 'boolean',
        headerName: 'Boolean',
      },
    ].map(col =>
      Object.assign(
        {},
        col,
        this.state.groupBy.includes(col.field)
          ? {
              rowGroup: true,
              rowGroupIndex: this.state.groupBy.indexOf(col.field),
            }
          : {}
      )
    );

    const autoGroupColumnDef = {
      // cellRendererFramework: function GroupCellRenderer(props) {
      //   return <span>foobarbaz!</span>;
      // },
      headerComponentFramework: () => {
        return (
          <div>
            <Icon
              clickable={true}
              icon={this.allExpanded ? 'chevron-down' : 'chevron-right'}
              onClick={() => {
                this.allExpanded
                  ? this.api.collapseAll()
                  : this.api.expandAll();

                this.allExpanded = !this.allExpanded;
              }}
              size="sm"
            />
          </div>
        );
      },
      cellRendererParams: {
        // innerRendererFramework: function GroupCellRenderer(props) {
        //   return <span>foobarbaz!</span>;
        // },
        checkbox: true,
      },
      field: 'id',
    };

    return (
      <div>
        <Select
          multiple
          value={this.state.groupBy}
          onChange={this.onGroupByChanged}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
        >
          {columns.map(column => (
            <MenuItem key={column.headerName} value={column.field}>
              <Checkbox checked={this.state.groupBy.includes(column.field)} />
              <ListItemText primary={column.headerName} />
            </MenuItem>
          ))}
        </Select>
        <div
          className="ag-theme-balham"
          style={{ width: '90%', height: '800px' }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={mockData}
            autoGroupColumnDef={autoGroupColumnDef}
            rowSelection="multiple"
            groupSelectsChildren={true}
            suppressRowClickSelection={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

export default AgGrid;

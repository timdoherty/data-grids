import React, { Component } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ColumnGroup } from "primereact/columngroup";

import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";

import data_0000 from "../../mocks/MOCK_DATA.js";
import data_1000 from "../../mocks/MOCK_DATA_1000.js";
import data_2000 from "../../mocks/MOCK_DATA_2000.js";
import data_3000 from "../../mocks/MOCK_DATA_3000.js";
import data_4000 from "../../mocks/MOCK_DATA_4000.js";

const data = data_0000
  .concat(data_1000)
  .concat(data_2000)
  .concat(data_3000)
  .concat(data_4000);

class PrimeReact extends Component {
  constructor() {
    super();

    this.state = {
      rows: data,
      groupBy: ["car_make"],
      expandedRows: {}
    };
  }

  toTitle(key) {
    return key
      .split("_")
      .map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1, word.length - 1);
      })
      .join(" ");
  }

  headerTemplate(data) {
    return <div style={{ background: "#eee" }}>{data.car_make}</div>;
  }

  footerTemplate(data) {
    return <div />;
  }

  render() {
    let columns = Object.keys(data[0]).map(key => ({
      key: key,
      title: this.toTitle(key)
    }));

    return (
      <div>
        <p>Count:{this.state.rows.length}</p>
        <Select
          multiple
          value={this.state.groupBy}
          onChange={this.onGroupByChanged}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(", ")}
        >
          {columns.map(column => (
            <MenuItem key={column.name} value={column.key}>
              <Checkbox checked={this.state.groupBy.includes(column.key)} />
              <ListItemText primary={column.name} />
            </MenuItem>
          ))}
        </Select>

        <DataTable
          value={this.state.rows}
          rowGroupMode="subheader"
          groupField="car_make"
          rowGroupHeaderTemplate={this.headerTemplate}
          rowGroupFooterTemplate={this.footerTemplate}
        >
          {columns.map(column => (
            <Column
              key={column.key}
              field={column.key}
              header={column.title}
              sortable={true}
            />
          ))}
        </DataTable>
      </div>
    );
  }
}

export default PrimeReact;

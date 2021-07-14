import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-date-picker";
import { MonthlySalessTable, MonthlyVendorsPayoutTable } from "../components/Tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";

export default function MonthlyVendorPayout() {
  const [value, onChange] = useState(new Date());
  useEffect(() => {}, [onChange]);

  let name = "name";

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Ahara</Breadcrumb.Item>
            <Breadcrumb.Item active>Monthly Vendor Payout</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Monthly Vendor Payout</h4>
        </div>
        {/* <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div> */}
      </div>
      <div>
        <h5>Choose Month</h5>
        <DatePicker onChange={onChange} value={value} />
        <br />
        <br />
      </div>

      <MonthlyVendorsPayoutTable
        date={
          (parseInt(value.getMonth(), 10) + 1).toString() +
          "/" +
          "01/" +
          value.getFullYear().toString()
        }
      />
    </div>
  );
}

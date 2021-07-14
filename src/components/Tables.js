import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import {ConfirmModal} from "./Forms";
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { db } from "../config/firebase";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">
              See all
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const MonthlySalessTable = (props) => {
  const totalTransactions = transactions.length;
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(props);

  useEffect(() => {
    let dataArray = [];
    db.collection("qrData")
      .where("createdAt", ">", new Date(props.date))
      .where(
        "createdAt",
        "<",
        new Date(new Date(props.date).getTime() + 60 * 60 * 24 * 30 * 1000)
      )
      .get()
      .then(async (docArray) => {
        if (docArray.size > 0) {
          let promiseArray = [];
          docArray.forEach((docArrayDocument) => {
            promiseArray.push(
              new Promise((resolve, reject) => {
                let data = docArrayDocument.data();
                console.log(data);
                let input = {
                  invoiceNumber: data.invoiceNumber,
                  nameOfCouponHolder: data.nameOfCouponHolder,
                  numberOfCoupons: data.totalCouponsData.length,
                  totalValueOfCoupons: data.totalValue,
                  date: new Date(props.date).toDateString(),
                };
                dataArray.push(input);
               // setVendors(dataArray);
                // setLoading(false);
                resolve();
              })
            );
          });
          await Promise.all(promiseArray);
          setVendors(dataArray);
          setLoading(false);
        } else {
          dataArray = [];
          setVendors(dataArray);
        }
      });
  }, [db, props.date]);

  const TableRow = (props) => {
    const {
      invoiceNumber,
      nameOfCouponHolder,
      numberOfCoupons,
      totalValueOfCoupons,
      date,
    } = props;
    // const statusVariant = status === "Paid" ? "success"
    //   : status === "Due" ? "warning"
    //     : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{nameOfCouponHolder}</span>
        </td>
        <td>
          <span className="fw-normal">{numberOfCoupons}</span>
        </td>
        <td>
          <span className="fw-normal">{totalValueOfCoupons}</span>
        </td>
        <td>
          <span className="fw-normal">{date}</span>
        </td>
        <td>
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </td>
      </tr>
    );
  };

  return (
    !loading && (
      <>
        <Card
          border="light"
          className="table-wrapper table-responsive shadow-sm"
        >
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">Invoice Number</th>
                  <th className="border-bottom">Name Of Coupon Holder</th>
                  <th className="border-bottom">Number Of Coupons</th>
                  <th className="border-bottom">Total Value Of Coupons</th>
                  <th className="border-bottom">Date</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((t) => (
                  <TableRow key={`transaction-${t.mobileNumber}`} {...t} />
                ))}
              </tbody>
            </Table>
            {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Item>4</Pagination.Item>
                  <Pagination.Item>5</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
                </Pagination>
              </Nav>
              <small className="fw-bold">
                Showing <b>{totalTransactions}</b> out of <b>25</b> entries
              </small>
            </Card.Footer> */}
          </Card.Body>
        </Card>
      </>
    )
  );
};

export const MonthlyVendorsPayoutTable = (props) => {
  const totalTransactions = transactions.length;
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(props);

  useEffect(() => {
    let dataArray = [];
    db.collection("qrData")
      .where("createdAt", ">", new Date(props.date))
      .where(
        "createdAt",
        "<",
        new Date(new Date(props.date).getTime() + 60 * 60 * 24 * 30 * 1000)
      )
      .get()
      .then(async (docArray) => {
        if (docArray.size > 0) {
          let promiseArray = []
          docArray.forEach((docArrayDocument) => {
            promiseArray.push(
              new Promise((resolve,reject) => {
                let data = docArrayDocument.data();
                console.log(data);
                const exists = (element) => element.vendor === data.vendor;
                if (!dataArray.some(exists)) {
                  let input = {
                    vendor: data.vendor,
                    month: new Date(props.date).toDateString().split(" ")[1],
                    numberOfCoupons: data.totalCouponsData.length,
                    totalValueOfCoupons: data.totalValue,
                  };
                  dataArray.push(input);
                  //setVendors(dataArray);
                } else {
                  const requiredValue = (element) => element.vendor === data.vendor;
                  const index = dataArray.findIndex(requiredValue);
                  let input = {
                    vendor: data.vendor,
                    month: new Date(props.date).toDateString().split(" ")[1],
                    numberOfCoupons:
                      parseInt(dataArray[index].numberOfCoupons, 10) +
                      data.totalCouponsData.length,
                    totalValueOfCoupons:
                      parseInt(dataArray[index].totalValueOfCoupons, 10) +
                      parseInt(data.totalValue, 10),
                  };
                  dataArray.splice(index, 1);
                  dataArray.push(input);
                }
                setLoading(false);
                resolve();
              })
            )
          });
          await Promise.all(promiseArray);
          setVendors(dataArray);
        } else {
          dataArray = [];
          setVendors(dataArray);
        }
      });
  }, [db, props.date]);

  const TableRow = (props) => {
    const { vendor, month, numberOfCoupons, totalValueOfCoupons } = props;
    // const statusVariant = status === "Paid" ? "success"
    //   : status === "Due" ? "warning"
    //     : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {vendor}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{month}</span>
        </td>
        <td>
          <span className="fw-normal">{numberOfCoupons}</span>
        </td>
        <td>
          <span className="fw-normal">{totalValueOfCoupons}</span>
        </td>
        <td>
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </td>
      </tr>
    );
  };

  return (
    !loading && (
      <>
        <Card
          border="light"
          className="table-wrapper table-responsive shadow-sm"
        >
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">Vendor</th>
                  <th className="border-bottom">Month</th>
                  <th className="border-bottom">Number Of Coupons</th>
                  <th className="border-bottom">Total Value Of Coupons</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((t) => (
                  <TableRow key={`transaction-${t.mobileNumber}`} {...t} />
                ))}
              </tbody>
            </Table>
            {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Item>4</Pagination.Item>
                  <Pagination.Item>5</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
                </Pagination>
              </Nav>
              <small className="fw-bold">
                Showing <b>{totalTransactions}</b> out of <b>25</b> entries
              </small>
            </Card.Footer> */}
          </Card.Body>
        </Card>
      </>
    )
  );
};

export const VendorsTable = () => {
  const totalTransactions = transactions.length;
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dataArray = [];
    db.collection("users")
      .get()
      .then(async (docArray) => {
        let promiseArray = [];
        docArray.forEach((docArrayDocument) => {
          promiseArray.push(new Promise((resolve,reject) => {
            let data = docArrayDocument.data();
            console.log(data);
            let input = {
              vendorName: data.vendorName,
              managerName: data.firstName + " " + data.lastName,
              createdAt: new Date(data.createdAt.seconds * 1000).toDateString(),
              mobileNumber: data.mobileNumber,
              grossMonthlyAmount: data.grossMonthlyAmount,
              grossWeeklyAmount: data.grossWeeklyAmount,
              grossDailyAmount: data.grossDailyAmount,
              address: data.address,
              location: data.location,
              city: data.city,
              district: data.district,
              state: data.state,
              pincode: data.pincode,
              active: data.active,
            };
            dataArray.push(input);
            // setVendors(dataArray);
            setLoading(false);
            resolve();
          }))
        });
        await Promise.all(promiseArray);
        setVendors(dataArray);
      });
  }, [db]);

  const TableRow = (props) => {
    const {
      vendorName,
      managerName,
      createdAt,
      mobileNumber,
      address,
      location,
      city,
      district,
      state,
      pincode,
      active,
    } = props;
    // const statusVariant = status === "Paid" ? "success"
    //   : status === "Due" ? "warning"
    //     : status === "Canceled" ? "danger" : "primary";
    const onToggleClick = () => {
      console.log(activeFlag , "activeFlag")
      setShowModal(true);
    }
    const [activeFlag , setActiveFlag] = useState(active);
    const [showModal , setShowModal] = useState(false);
    return (
      <tr>
        <ConfirmModal mobileNumber = {mobileNumber} activeFlag = {activeFlag} show = {showModal} onHide = {() => {setShowModal(false)}} setActiveFlag = {(t) => {setActiveFlag(t)}}/>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {vendorName}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{managerName}</span>
        </td>
        <td>
          <span className="fw-normal">{createdAt}</span>
        </td>
        <td>
          <span className="fw-normal">{mobileNumber}</span>
        </td>
        <td>
          <span className="fw-normal">{address}</span>
        </td>
        <td>
          <span className={`fw-normal `}>{location}</span>
        </td>
        <td>
          <span className={`fw-normal `}>{city}</span>
        </td>
        <td>
          <span className="fw-normal">{district}</span>
        </td>
        <td>
          <span className={`fw-normal `}>{state}</span>
        </td>
        <td>
          <span className={`fw-normal `}>{pincode}</span>
        </td>
        <td >
          <Button className={`fw-normal `} onClick = {() => {onToggleClick()}}>{activeFlag !== undefined ? activeFlag.toString() : "true"}</Button>
        </td>
        <td>
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </td>
      </tr>
    );
  };

  return (
    !loading && (
      <>
        <Card
          border="light"
          className="table-wrapper table-responsive shadow-sm"
        >
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">Vendor Name</th>
                  <th className="border-bottom">Manager Name</th>
                  <th className="border-bottom">Registration Date</th>
                  <th className="border-bottom">Mobile Number</th>
                  <th className="border-bottom">Address</th>
                  <th className="border-bottom">Location</th>
                  <th className="border-bottom">City</th>
                  <th className="border-bottom">District</th>
                  <th className="border-bottom">State</th>
                  <th className="border-bottom">Pincode</th>
                  <th className="border-bottom">Enabled</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((t) => (
                  <TableRow key={`transaction-${t.mobileNumber}`} {...t} />
                ))}
              </tbody>
            </Table>
            {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Item>4</Pagination.Item>
                  <Pagination.Item>5</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
                </Pagination>
              </Nav>
              <small className="fw-bold">
                Showing <b>{totalTransactions}</b> out of <b>25</b> entries
              </small>
            </Card.Footer> */}
          </Card.Body>
        </Card>
      </>
    )
  );
};

export const TransactionsTable = (props) => {
  const totalTransactions = transactions.length;
  const [couponTransactions, setCouponTransactions] = useState([]);
  console.log(props);
  useEffect(() => {
    if (props.date) {
      setCouponTransactions([]);
      let dataArray = [];
      db.collection("qrData")
        .where("createdAt", ">", new Date(props.date))
        .where(
          "createdAt",
          "<",
          new Date(new Date(props.date).getTime() + 60 * 60 * 24 * 1000)
        )
        .get()
        .then(async (docArray) => {
          if (docArray.size > 0) {
            let promiseArray = [];
            docArray.forEach((docArrayDocument) => {
              promiseArray.push(new Promise((resolve,reject) => {
                let data = docArrayDocument.data();
              console.log(data);
              let input = {
                invoiceNumber: data.invoiceNumber,
                customerName: data.nameOfCouponHolder,
                issuedDate: new Date(
                  data.createdAt.seconds * 1000
                ).toDateString(),
                dueDate: new Date(
                  data.createdAt.seconds * 1000 + 5 * 24 * 60 * 60 * 1000
                ).toDateString(),
                hospitalName: data.totalCouponsData[0].nameOfHospital,
                numberOfCoupons: data.totalCouponsData.length,
                totalValue:
                  data.totalCouponsData.length *
                  data.totalCouponsData[0].couponValue,
              };
              dataArray.push(input);
              resolve();
              }))
            });
            await Promise.all(promiseArray);
            setCouponTransactions(dataArray);
          } else {
            let dataArray = [];
            setCouponTransactions(dataArray);
          }
        });
    } else {
      let dataArray = [];
      setCouponTransactions([]);
      db.collection("qrData")
        .get()
        .then(async (docArray) => {
          if (docArray.size > 0) {
            let promiseArray = [];
            docArray.forEach((docArrayDocument) => {
              let data = docArrayDocument.data();
              promiseArray.push(new Promise((resolve,reject) => {
                console.log(data);
                let input = {
                  invoiceNumber: data.invoiceNumber,
                  customerName: data.nameOfCouponHolder,
                  issuedDate: new Date(
                    data.createdAt.seconds * 1000
                  ).toDateString(),
                  dueDate: new Date(
                    data.createdAt.seconds * 1000 + 5 * 24 * 60 * 60 * 1000
                  ).toDateString(),
                  hospitalName: data.totalCouponsData[0].nameOfHospital,
                  numberOfCoupons: data.totalCouponsData.length,
                  totalValue:
                    data.totalCouponsData.length *
                    data.totalCouponsData[0].couponValue,
                };
                dataArray.push(input);
                resolve();
              }))
            });
            await Promise.all(promiseArray);
            setCouponTransactions(dataArray);
          } else {
            let dataArray = [];
            setCouponTransactions(dataArray);
          }
        });
    }
  }, [db, props.date]);

  const TableRow = (props) => {
    const {
      invoiceNumber,
      customerName,
      issuedDate,
      dueDate,
      hospitalName,
      numberOfCoupons,
      totalValue,
    } = props;
    // const statusVariant = status === "Paid" ? "success"
    //   : status === "Due" ? "warning"
    //     : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{customerName}</span>
        </td>
        <td>
          <span className="fw-normal">{issuedDate}</span>
        </td>
        <td>
          <span className="fw-normal">{dueDate}</span>
        </td>
        <td>
          <span className="fw-normal">{hospitalName}</span>
        </td>
        <td>
          <span className={`fw-normal `}>{numberOfCoupons}</span>
        </td>
        <td>
          <span className={`fw-normal `}>{totalValue}</span>
        </td>
        <td>
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Customer Name</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Due Date</th>
              <th className="border-bottom">Hospital Name</th>
              <th className="border-bottom">Number of Coupons</th>
              <th className="border-bottom">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {couponTransactions.map((t) => (
              <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item >1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer> */}
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import Modal from "react-bootstrap/Modal";
import PaymentPortal from "./PaymentPortal";
import { db } from "../config/firebase";
import * as firebaseui from "firebaseui";
import { firebaseConfig } from "../config/firebase";
import firebase from "firebase";

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Enter Coupon Details</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          birthday ? moment(birthday).format("MM/DD/YYYY") : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save and Generate Coupon
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const MobileNumberVerificationForm = (props) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [totalCouponCount, setTotalCouponCount] = useState(0);
  const [remainingCouponCount, setRemainingCouponCount] = useState(0);
  const [proceedToUserAuth, setProceedToUserAuth] = useState(false);
  const [mobileNumberVerified, setMobileNumberVerified] = useState(false);

  const firebaseAuth = async () => {
    //const fbase = firebase.initializeApp(firebaseConfig);
    const uiConfig = {
      //signInSuccessUrl: "",
      // callbacks : {setProceedToUserAuth(false)},
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          setProceedToUserAuth(false);
          setMobileNumberVerified(true);
          props.onConfirmed(true);
          ui.delete();
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect
          // automatically or whether we leave that to developer to handle.
          return true;
        },
        // signInFailure: function(error) {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        // return handleUIError(error);
        //},
        // uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        //   document.getElementById('loader').style.display = 'none';
        // }
      },
      // tosUrl: "",
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  };

  const fetchUserDetails = async () => {
    let userDoc = db
      .collection("qrData")
      .where("mobileNumber", "==", mobileNumber.toString())
      .get();
    let promiseArray = [];
    let totalCouponCount = 0;
    (await userDoc).forEach((doc) => {
      promiseArray.push(
        new Promise((resolve, reject) => {
          totalCouponCount += parseInt(doc.data().totalCouponsData.length, 10);
          resolve();
        })
      );
    });
    await Promise.all(promiseArray);
    console.log(totalCouponCount);
    setTotalCouponCount(totalCouponCount);
    let remainingCouponCount =
      props.couponLimit - totalCouponCount > 0
        ? props.couponLimit - totalCouponCount
        : 0;
    setRemainingCouponCount(remainingCouponCount);
    if (totalCouponCount > props.couponLimit) {
      alert("You are not eligible for coupons");
    } else {
      setConfirmTransaction(true);
    }
    return totalCouponCount;
  };

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      {!proceedToUserAuth && (
        <Card border="light" className="bg-white shadow-sm mb-4">
          <CouponCountDetailsModal
            totalCouponCount={totalCouponCount}
            remainingCouponCount={remainingCouponCount}
            onHide={() => {
              setConfirmTransaction(false);
            }}
            onProceed={() => {
              firebaseAuth();
              setProceedToUserAuth(true);
              setConfirmTransaction(false);
            }}
            //onProceed={props.onConfirmed}
            show={confirmTransaction}
          />
          <Card.Body>
            <h5 className="mb-4">Enter Mobile Number (Coupon Holder)</h5>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter your mobile number"
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-3">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={fetchUserDetails}
                >
                  Proceed
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

function CouponCountDetailsModal(props) {
  console.log(props);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Coupon History Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          You have purchased {props.totalCouponCount} coupons in the last quater
          . You have {props.remainingCouponCount} coupons/coupon left.
        </h4>

        <p>Do you want to proceed ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>No</Button>
        <Button onClick={props.onProceed}>Yes , Proceed</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  console.log(props);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Proceed to Generate Coupons
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Coupon Details</h4>

        <p>
          <b>First Name :</b>
          {props.firstName}
          <br />
          <b>Last Name :</b>
          {props.lastName}
          <br />
          <b>Gender :</b>
          {props.gender}
          <br />
          <b>Name Of Hospital :</b>
          {props.nameOfHospital}
          <br />
          <b>IPD Registration Number :</b>
          {props.ipdRegistrationNumber}
          <br />
          <b>Location :</b>
          {props.location}
          <br />
          <b>Coupon Value :</b>
          {props.couponValue}
          <br />
          <b>Number Of Coupons :</b>
          {props.numberOfCoupons}
          <br />
          <b>Total Value :</b>
          {props.totalValue}
          <br />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <PaymentPortal
          onPayment={() => setPaymentConfirmed(true)}
          totalValue={props.totalValue}
        />
        <Button onClick={props.onProceed} disabled={!paymentConfirmed}>
          Proceed to Coupon Generation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredQRCodeModal(props) {
  console.log(props);
  const styles = {
    main: {
      display: "flex",
      flexDirection: "row",
    },
    details: {
      margin: 25,
    },
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Coupons</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.imageArray.map((element, key) => {
          return (
            <div key={key} style={styles.main}>
              <img src={`data:image/jpeg;base64,${element}`} />
              <div style={styles.details}>
                <h4>Coupon Details</h4>
                <p>
                  <b>First Name :</b>
                  {props.firstName}
                  <br />
                  <b>Last Name :</b>
                  {props.lastName}
                  <br />
                  <b>Gender :</b>
                  {props.gender}
                  <br />
                  <b>Name Of Hospital :</b>
                  {props.nameOfHospital}
                  <br />
                  <b>IPD Registration Number :</b>
                  {props.ipdRegistrationNumber}
                  <br />
                  <b>Location :</b>
                  {props.location}
                  <br />
                  <b>Coupon Value :</b>
                  {props.couponValue}
                  <br />
                </p>
              </div>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ConfirmModal(props) {
  console.log(props);
  const styles = {
    main: {
      display: "flex",
      flexDirection: "row",
    },
    details: {
      margin: 25,
    },
  };
  const onConfirm = () => {
    let active = null;
    if (props.activeFlag === false) {
      active = true;
    } else {
      active = false;
    }
    console.log(props.activeFlag, "activeFlag");
    db.collection("users")
      .doc(props.mobileNumber.toString())
      .update({
        active: active,
      })
      .then(() => {
        console.log("Updated the active flag!");
        props.setActiveFlag(active);
      })
      .catch(() => {
        console.log("There was some error in updating the error flag");
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Do you want to {props.activeFlag ? "disable" : "enable"} this user?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>No</Button>
        <Button
          onClick={() => {
            onConfirm();
            props.onHide();
          }}
        >
          Yes,Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export const CouponDetails = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nameOfHospital, setNameOfHospital] = useState("");
  const [ipdRegistrationNumber, setIpdRegistrationNumber] = useState("");
  const [location, setLocation] = useState("");
  const [couponValue, setCouponValue] = useState(0);
  const [numberOfCoupons, setNumberOfCoupons] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [generateQR, setGenerateQR] = useState(false);
  const [confirmQRGeneration, setConfirmQRGeneration] = useState(false);
  const [imageArray, setImageArray] = useState([
    "iVBORw0KGgoAAAANSUhEUgAAAVQAAAFUAQAAAABT6fkYAAAEhUlEQVR4Xu2aUYrbQBBE2+hDnz6CbhJdTGDDXmx9Ex1Bn/pY3KlXrU2UsIHkLw0eWGHN1AjUPVNVPdrIv25b/N7z5/bCVnthq72w1V7Yav+MXSNiyD2umWPmPcbHFpGPbZn2S96nXcPAemL197aOuon9WywhxEfEt+t9Up8mzAXpiVUI3ri55T5vN/pzHZ/XexCCSfOH3thVXbeMWSEgIpNQhIA4tMemumLK97itfvskvRHXj+bYZP0GezOd2TnfMohNPvTri7XeCKv3HpRjJ/qLi4aBtcRW251PBWN1HBJ2Nfl8AlpiFQcyazoNNmgcKzlHRMOXtth8VwjGRyIQrOSKA3vzIoodDWmKTaVSm3EWk5qB8gmd0pcofkCsXbF60w0mvRIC7Mu7Uo5yTCENUZTkcLpic2RQb1/kk/tlG+hLS+Oki1tL7Go5P/rxMI+NF9+0VbnV3jzrZjesqFNuOvHVP7LNxQHaeUhbbNIUggE6HWBSTZClUYOQnrY0TbG6G+CYBUOWNjKTgnEn5QM10ikO7bDSC4jG23KBd94YE7FaL1z6NcXy4gyq1eDT5pr1izSW4e6KVV2XkI/sC3SaYIlD1IQKS1Msy5TCVZx6Ucp96lDb0k/i0hW74jhZpvX2uDIF44F8aEIo5QuwltiiU6gzLPE7IdAE7UgmYLintlh8tWofeRgfFFEFhX5J3XGhoH7GoRmWrkG2MymK0AsU36qoYDgEJ73ohq0DvnlzXRflq0dqPUVEaqJC6WccmmHVFc5iHvaFEJh8RtIbnI51xaIILtTTbIPZxHECIw75qz9rhqWORQsX+POGzZabkQxCSOKiM+90w9YydRVEfYBT04J9Z5btmqwosJZY5Zj169qnJJ71S2y8LWlTW6z2ppXcu3TgdNbtA9QCIZ3q2GbY4h3W6kS22aB3zvsW10Pam/Q1xaIXRT5mUnjHy3nhu8gtXbe3xbIZpxrkEGwnKp41UiiNWUfSTbGoHa9Lv4w0O9K+RptW6/fSGJtFL7N+BZwKk9b6dXpdwbfFll4kpuVQiTA2qh5KRKMr1gdFGrRKeFA2m3MjBcgPOcWhGRbWVElHhWentlMP2Z85IlXWtsVSKVgQRTk3zlY0yIkKcciRALXFBrazBhO9uPDvG16/M0+iry2WE73DbM7024U65Q/2K4cQXbE+74NO7WYGJlg0PqIC9ORJfbFaoUpvHnFQUZQoPucPA1+2ThzVDLumWZP/zeAwxZRTWniUeSe9aIc1fxKHU60HsUKxuiTurSv2OHrgdVm15VzwZ1q4CgalX1csjUMwTmephzQYE5w65aH4J95piLUgDnzzicqx/ZlmKTYqHNauWL0p+aQUCqoge5hPf8b3LIlkW2xSzTmpO7O0QaXzLGIW9vqLXrTDcrZHHPCZFRb/x42W8+zb0/rtiVUIbooIZR7KYQXUVsVrnzmqJZbCISzsPlEpiSfR4Ppik0/g42ddJ/FDGh/QKXWEbk9x6IYN70g++ZPo5ONI1UM7JxFo/9QV+5ftha32wlZ7Yau9sNX+C+x3qwdgowEU30sAAAAASUVORK5CYII=",
  ]);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <MyVerticallyCenteredModal
        firstName={firstName}
        lastName={lastName}
        // dateOfBirth={dateOfBirth}
        gender={gender}
        nameOfHospital={nameOfHospital}
        ipdRegistrationNumber={ipdRegistrationNumber}
        location={location}
        couponValue={couponValue}
        numberOfCoupons={numberOfCoupons}
        totalValue={totalValue}
        show={generateQR}
        onHide={() => setGenerateQR(false)}
        onProceed={() => {
          setGenerateQR(false);
          setConfirmQRGeneration(true);
        }}
      />
      <MyVerticallyCenteredQRCodeModal
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        nameOfHospital={nameOfHospital}
        ipdRegistrationNumber={ipdRegistrationNumber}
        location={location}
        couponValue={couponValue}
        show={confirmQRGeneration}
        imageArray={imageArray}
        onHide={() => {
          setConfirmQRGeneration(false);
          props.onConfirmed(false);
        }}
      />
      <Card.Body>
        <h5 className="mb-4">Enter Coupon Details</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {console.log(firstName)}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                {console.log(lastName)}
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Date of Birth</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={(e) => setDateOfBirth(e)}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          dateOfBirth
                            ? moment(dateOfBirth).format("MM/DD/YYYY")
                            : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  defaultValue="0"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Name Of Hospital</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Hospital Name"
                  onChange={(e) => setNameOfHospital(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="IPDNumber">
                <Form.Label>IPD Registration Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="PK123456B"
                  onChange={(e) => setIpdRegistrationNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="couponValue">
                <Form.Label>Coupon Value</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="10"
                  onChange={(e) => {
                    setCouponValue(e.target.value);
                    setTotalValue(e.target.value * numberOfCoupons);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="numberOfCoupons">
                <Form.Label>Number of Coupons</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="10"
                  onChange={(e) => {
                    setNumberOfCoupons(e.target.value);
                    console.log(e.target.value, couponValue);
                    setTotalValue(e.target.value * couponValue);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="totalValue">
                <Form.Label>Total Value</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder={totalValue}
                  value={totalValue}
                />
              </Form.Group>
            </Col>
            {/* <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col> */}
          </Row>
          <div className="mt-3">
            <Button
              variant="primary"
              type="submit"
              onClick={() => setGenerateQR(true)}
            >
              Save and Generate Coupon
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

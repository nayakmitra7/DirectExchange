import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import "./Offer.css";
import Accordion from "react-bootstrap/Accordion";
import { address } from "../../js/helper/constant";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
// import Button from "react-bootstrap/esm/Button";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button1 from "react-bootstrap/Button";
class MyOffer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    navarr: ["rgb(0, 106, 255)", "black", "black", "black", "black"],
    openOffers: [],
    open: false,
  };

  componentDidMount() {
    //change the id of user after kena complete
    this.getOffer();
  }

  getOffer() {
    axios
      .get(`${address}/offer/` + localStorage.getItem("id") + `/open`)
      .then((response) => {
        console.log(response.data);
        this.setState({ openOffers: response.data });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: false,
        });
      });
  }
  autoMatch = (id) => {
    localStorage.setItem("autoMatchId", id);
    this.props.history.push("/autoMatching");
  };
  handleClickOpen = (offer) => {
    this.setState({ offerToBeModified: offer });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  modifyAmount = async () => {
    const offer = {
      id: this.state.offerToBeModified.id,
      amount: this.state.modifiedAmount,
    };
    const modifiedoffer = await axios.put(
      `${address}/offer?id=${offer.id}&amountInSrc=${offer.amount}`,
      offer
    );
    this.getOffer();
    this.handleClose();
  };
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <div className="margin-left-right-offer">
          {this.state.openOffers.map((offer) => (
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              className="gray-auto-matching"
              key={offer.id}
              className={"offer" + offer.offerStatus}
            >
              <ListGroup.Item
                variant="secondary"
                className="list-group-style-auto-matching "
              >
                <Row className="header-bold-auto-matching ">
                  <Col>Offer ID</Col>
                  <Col>Username</Col>
                  <Col>Country(des)</Col>
                  <Col>Amount(des)</Col>
                  <Col>Amount(src)</Col>
                  <Col>Country(src)</Col>
                  <Col>Exp Date</Col>
                  <Col>
                    <Button1
                      size="sm"
                      style={{ marginBottom: "1%" }}
                      className="btn btn-primary"
                      onClick={() => this.autoMatch(offer.id)}
                    >
                      Auto Match
                    </Button1>
                  </Col>
                </Row>
                <Row>
                  <Col>#{offer.id}</Col>
                  <Col>{offer.nickname}</Col>
                  <Col>{offer.destinationCountry}</Col>
                  <Col>
                    {offer.amountInDes} {offer.destinationCurrency}
                  </Col>
                  <Col>
                    {offer.amountInSrc} {offer.sourceCurrency}
                  </Col>
                  <Col>{offer.sourceCountry}</Col>
                  <Col>{offer.expirationDate}</Col>

                  <Col>
                    <Button1
                      style={{ marginTop: "1%" }}
                      size="sm"
                      variant="success"
                      onClick={() => this.handleClickOpen(offer)}
                    >
                      Modify Offer
                    </Button1>
                  </Col>
                </Row>
                <Row></Row>
              </ListGroup.Item>
            </Accordion.Toggle>
          ))}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modify Your Offer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter new amount for your offer to modify.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Offer Amount"
              type="number"
              fullWidth
              onChange={(e) => {
                this.setState({ modifiedAmount: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.modifyAmount} color="primary">
              Modify
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MyOffer;

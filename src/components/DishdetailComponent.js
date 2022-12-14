import React, {Component } from 'react';
import {
    Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);





class CommentForm extends Component {
    constructor(props) {
        super(props);


        this.state = {

            rating: '',
            name: '',
            comment: '',

            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (


            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>  Comment Form</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} className="font-weight-bold">Rating</Label>
                                <Col md={10}>

                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>




                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12} className="font-weight-bold">Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={12} className="font-weight-bold">Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 0 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                           </Button>
                                </Col>
                            </Row>

                        </LocalForm>

                    </ModalBody>
                </Modal>

            </div>


        );
    }
}


function RenderComments({ comments }) {
    
         return (
             <div className="col-12 col-md-5 m-1">
                 <h4> Comments </h4>
                 <ul className='list-unstyled'>
                     {comments.map((comment) => {
                         return (
                             <li key={comment.id}>
                                 <p>{comment.comment}</p>
                                 <p>-- {comment.author},
                             &nbsp;
                             {new Intl.DateTimeFormat('en-US', {
                                     year: 'numeric',
                                     month: 'long',
                                     day: '2-digit'
                                 }).format(new Date(comment.date))}
                                 </p>
                             </li>
                         );
                     })}
                        <CommentForm/>

                 </ul>

             
         
     
        
            
                </div>
            );

        }
     
      

function RenderDish({dish}) {
        
    return (

        <Card >
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>

    );
       
    }


const DishDetail = (props) => {

    if (props.dish != null) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }
     else
        return (
            <div></div>
        );

    
}



export default DishDetail;
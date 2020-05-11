import React, { Component } from 'react';
import Lesson from '../Lesson/LessonComponent';
import { Link, Prompt, Redirect } from 'react-router-dom';
import toast from '../commonService/toastConfig'

class Course extends Component<any, any> {

    userNameRef: any;

    constructor(props: any) {
        super(props);
        this.handleClick3 = this.handleClick3.bind(this);
        this.register = this.register.bind(this);
        this.userNameRef = React.createRef();
        this.handleToogleOutline = this.handleToogleOutline.bind(this);
        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.state = {
            isShowOutline: false,
            courseBody: [],
            isBlocking: false, 
            reDirectToRegisterPage: false
        }
    }
    

    handleClick1() {
        alert("click1");
    }

    handleClick2(input: string) {
        alert(input);
    }
    
    handleClick3() {
        alert(this.props.name);
    }

    register(event: any) {
        let usernameValue = this.userNameRef.current.value;
        event.preventDefault();
        //event.target.reset();
        if(usernameValue) {
            this.setState({
                isBlocking: false,
                reDirectToRegisterPage: true
            });
        } else {
            toast.error("Cannot leave username!!");
        }
  
    }

    handleToogleOutline() {
        this.setState({
            isShowOutline: !this.state.isShowOutline
        });
    }

    componentWillMount() {
        // CourseService.getCourseContent("abc").then(response => {
        //         console.log(response)
        //     }).catch(error => {
        //         console.log(error);
        //     }) ;
    }

    handleClickTitle() {
        this.props.onChangeTitle(this.props.name);
    }

    setIsBlockingState(event: any) {
        this.setState({
            isBlocking: event.target.value.length > 0
        });
    }

    showButtonFree() {
        const isFree = this.props.free;
        if(isFree) {
            return  (
                <div className="btn-group">
                    <button type="button" onClick={this.handleClick1} className="btn btn-danger">Left</button>
                    <button type="button" onClick={() => this.handleClick2("View 2")} className="btn btn-warning">Middle</button>
                    <button type="button" onClick={this.handleClick3} className="btn btn-info">Right</button>
                    <button type="button" onClick={this.handleClickTitle} className="btn btn-success">ChangeTitle</button>
                </div>
            )
        } else {
            return(
                <form onSubmit={(event) => this.register(event)}>
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button  className="btn btn-info" type="submit">Register!</button>
                        </span>
                        <input type="text" onChange={(event) => this.setIsBlockingState(event)} className="form-control" placeholder="UserName" ref={this.userNameRef}/>
                    </div>
                </form>
                
            )
        }
    }

    render() {
        let outline;
        if(this.state.reDirectToRegisterPage) {
            return (<Redirect to={"/register/" + this.userNameRef.current.value}/>);
        }
        if(this.state.isShowOutline) {
            const lessonesElm = this.props.lessons.map((value: any, key: any) => {
                return <Lesson key={key} lessonsName={value.name}></Lesson>
            });
            outline =   <ul className="list-group">
                            {lessonesElm}
                        </ul>;
        }
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <Prompt when={this.state.isBlocking} message={(location: any) => `Are you sure you want to go to ${location.pathname}`}/>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.name}</h3>
                    </div>

                    <div className="panel-body">
                        <p>{this.props.time}</p>
                        <p>{this.props.children}</p>
                        <div className="btn-group">
                            <p>
                                <button type="button" onClick={this.handleToogleOutline} className="btn btn-success">Toogle outline</button>
                                <Link to={"/detail/" + this.props.courseId} className="btn btn-default">See details</Link>
                            </p>
                        </div>
                        {outline}
                    </div>
                    <div className="panel-footer">
                        {this.showButtonFree()}
                    </div>
                </div>
            </div>
        )
    };
};

export default Course;

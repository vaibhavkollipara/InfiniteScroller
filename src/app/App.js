import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as flickerActions from './actions/FlickerActions';

import icon from './assets/images/icon.png';
import photo from './assets/images/photo.jpg';
import './styles/style.scss';

class App extends Component{

    constructor(){
        super();
        this.state = {
            scroll : 0,
            loading : false,
            pics : [],
            error : null,
            page : 1,
            totalPages:1
        };
    }

    componentDidMount(){
        this.props.fetchPics(this.state.page);
    }

    componentWillUnmount(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.flicker !== this.props.flicker){
            this.setState({
                loading: nextProps.flicker.loading,
                pics : nextProps.flicker.pics,
                page : nextProps.flicker.page,
                totalPages : nextProps.flicker.totalPages,
                error : nextProps.flicker.error
            });
        }
    }

    handleScroll(e){
        this.setState({
            scroll : this.refs.pics.scrollTop/(this.refs.pics.scrollHeight-this.refs.pics.clientHeight)*100
        });

        if(this.state.scroll>80){
            this.props.fetchPics(this.state.page);
        }
    }

    getImages(){
        let i=0;
        return this.state.pics.map(photo => <img key={++i}
                                                className="Photo"
                                                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />);
    }

    render(){
        return (
                <div className="App">
                    <div className="header">Infinite Scrolling</div>
                    <div ref="pics" className="Pics" onScroll={this.handleScroll.bind(this)}>
                        {this.getImages()}
                    </div>
                    {
                        this.state.loading &&
                        <h2>Loading</h2>
                    }
                </div>
        );
    }
}

function mapStateToProps(state){
  return {
    flicker : state.flicker
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                fetchPics : flickerActions.fetchPics,
            },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrapperComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
            componentWillMount(){
                this.reqInterceptors = axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
                })
                this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error})
                })
            }

            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptors);
                axios.interceptors.response.eject(this.resInterceptors);
            }
            errorConfirmHandler = () => {
                this.setState({error: null})
            }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed={this.errorConfirmHandler}> 
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>   
            )
        }  
    }
}

export default withErrorHandler;
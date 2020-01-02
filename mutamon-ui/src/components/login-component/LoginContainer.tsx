import { IState } from "../../reducers";
import { connect } from "react-redux";
import { LoginComponent } from "./LoginComponent";
import {userLogin} from '../../action-mappers/login-action-mappers'

const mapStateToProps = (state: IState) => {
    return{
        user: state.login.user,
    }
}

const mapDispatchToProps = {
    userLogin
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
import { IState } from "../../reducers"
import { connect } from "react-redux"
import {userLogin, currentUserMutamon} from '../../action-mappers/login-action-mappers'
import { SignUpComponent } from "./SignUpComponent"

const mapStateToProps = (state: IState) => {
    return{
        user: state.login.user,
    }
}

const mapDispatchToProps = {
    userLogin,
    currentUserMutamon
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpComponent)
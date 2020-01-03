import { IState } from "../../reducers"
import {clearState} from '../../action-mappers/login-action-mappers'
import { connect } from "react-redux"
import { NavbarComponent } from "./NavbarComponent"

const mapStateToProps = (state: IState) => {
    return{
        
    }
}

const mapDispatchToProps = {
    clearState
}

export default connect(mapStateToProps,mapDispatchToProps)(NavbarComponent)

import { connect } from "react-redux"
import { UserPageComponet } from "./UserPageComponent"
import { IState } from "../../reducers"


const mapStateToProps = (state: IState) => {
    return {
      //  user: state.login.monster
    }
}

export default connect(mapStateToProps)(UserPageComponet)

import { connect } from "react-redux"
import { UserPageComponet } from "./UserPageComponent"
import { IState } from "../../reducers"


const mapStateToProps = (state: IState) => {
    return {
      currentMutamon: state.login.currentMutamon
    }
}

export default connect(mapStateToProps)(UserPageComponet)
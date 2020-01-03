import { IState } from "../../reducers"
import { connect } from "react-redux"
import { MutationSelectionPageComponent } from "./MutationSelectionPageComponent"
import { updateCurrentMutamon } from "../../action-mappers/login-action-mappers"

const mapStateToProps = (state: IState) => {
    return{
        currentMutamon: state.login.currentMutamon,
        user: state.login.user
    }
    
}

const mapDispatchToProps = {
    updateCurrentMutamon
}

export default connect(mapStateToProps,mapDispatchToProps)(MutationSelectionPageComponent)
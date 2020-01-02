import { IState } from "../../reducers";
import { connect } from "react-redux";
import { BattleComponent } from "./BattleComponents";



const mapStateToProps = (state: IState, ownProps: any) =>{
    return{
        
    }
}

export default connect(mapStateToProps)(BattleComponent)
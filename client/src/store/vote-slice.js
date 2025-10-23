import {createSlice,current} from "@reduxjs/toolkit";

const currentVoter ={id: "" ,token: "", isAdmin:false}
const initialState={selectedVoteCandidate: "" ,currentVoter, selectedElection:"", idOfelectionToUpdate:"",
    addCandidateElectionId:""}
 
    const voteSlice= createSlice({
        name: "vote",
        initialState,
        reducers: {
            changeSelectedVoteCandidate(state,action){
                state.selectedVoteCandidate=action.payload;
              },
              changeCurrentVoter(state,action){
                state.currentVoter= action.payload;
              },
              changeSelectedElection(state,action){
                state.selectedElection=action.payload;
              },
              changeIdOfCandidateElectionId(state,action){
                state.addCandidateElectionId=action.payload;
              },
              changeAddCandidateElectionId(state,action){
                state.addCandidateElectionId=action.payload;
              }

        }
    })
    export const voteActions= voteSlice.actions
    export default voteSlice

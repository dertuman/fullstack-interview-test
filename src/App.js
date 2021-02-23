import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './Components/Navigation/Navigation';
import Branches from './Components/Branches/Branches';
import BranchDetails from './Components/BranchDetails/BranchDetails';
import CommitDetails from './Components/CommitDetails/CommitDetails';
import CreatePullRequest from './Components/CreatePullRequest/CreatePullRequest';
import PullRequestList from './Components/PullRequestList/PullRequestList';

function App() {
  return (
    // Using browser router to define the routes as well as query params
    <Router>
        <Navigation />  
        <Route path="/" exact component={Branches} />
        {/* Using query params as :id and :name */}
        <Route path="/branch-details/:id/:name" exact component={BranchDetails} />
        <Route path="/commit-details/:id" exact component={CommitDetails} />
        <Route path="/create-pull-request/" exact component={CreatePullRequest} />
        <Route path="/pull-request-list/" exact component={PullRequestList} />
    </Router>
  );
}

export default App;

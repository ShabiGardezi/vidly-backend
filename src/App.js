import Customers from "./components/Customers";
import NavBar from "./components/Navbar";
import Rentals from "./components/Rental";
import Movies from "./components/movies";
import NotFound from "./components/NotFound";
import { Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/movies" exact component={Movies}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;

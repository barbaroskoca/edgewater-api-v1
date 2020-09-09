import { Route } from "../types";
import personRoutes from "./person/routes";


// Had to combine all routes together by concat'ing them
const routes: Route[] = personRoutes;

export default [...routes];
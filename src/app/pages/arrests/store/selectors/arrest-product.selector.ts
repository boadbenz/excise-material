import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers';
import * as fromArrestProduct from '../reducers/arrest-product.reducer';

import { ArrestProduct } from "../../models/arrest-product";

// export const getArrestProductState = createSelector(
//     fromFeature.getArrestProductsState,
//     (state: fromFeature.ArrestState) => state.arrestProduct
//   );

// export const getArrestProductEntities = createSelector(
//     getArrestProductState,
//     fromArrestProduct.getArrestProductEntities
//   );
  
//   export const getSelectedArrestProduct = createSelector(
//     getArrestProductEntities,
//     fromRoot.getRouterState,
//     (entities, router): ArrestProduct => {
//       debugger
//       return router.state && entities[router.state.params.ProductID];
//     }
//   );
  
//   export const getPizzaVisualised = createSelector(
//     getSelectedPizza,
//     fromToppings.getToppingEntities,
//     fromToppings.getSelectedToppings,
//     (pizza, toppingEntities, selectedToppings) => {
//       debugger
//       const toppings = selectedToppings.map(id => toppingEntities[id]);
//       return { ...pizza, toppings };
//     }
//   );
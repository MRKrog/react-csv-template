import uniqid from 'uniqid';
import * as moment from 'moment';


// let prodTemp = {
//   _index: "product_variant_custom",
//   _type: "_doc",
//   _id: '',
//   _source: {
//     levar_user_account_id: "9a219350-f35b-4284-9a00-2cceae2bf262",
//     image_url: {},
//   },
//   custom_asset_status: false,
//   asset_stage: 0,
//   inventory_management: 'custom',
// }

export const productUpdater = (data) => {

  let finalProducts = []

  let prodSorted = data.sort((a,b) => (a['Product_ID'] - b['Product_ID']))

  let allProducts = prodSorted.reduce((acc, prod) => {

    let prodTemp = {
      _id: '',
      _source: {
        levar_user_account_id: "9a219350-f35b-4284-9a00-2cceae2bf262",
        image_url: {},
      },
      custom_asset_status: false,
      asset_stage: 0,
      inventory_management: 'custom',
    }

    let variantId = uniqid('','-varID');
    let now = moment().format();

    if (!acc[prod['Product_ID']]) {
      acc[prod['Product_ID']] = [];
    }

    prodTemp._id = variantId;
    prodTemp._source.id = variantId;
    prodTemp._source.price = prod.price;
    prodTemp._source.title = prod.variant_title;
    prodTemp._source.product_title = prod.product_title;
    prodTemp._source.product_vendor = prod.product_vendor;
    prodTemp._source.product_type = prod.product_type;
    prodTemp._source.image_url.src = prod.image_url;
    prodTemp._source.store_url = prod.product_url;
    prodTemp._source.created_at = now;
    prodTemp._source.updated_at = now;

    acc[prod['Product_ID']].push(prodTemp);

    return acc;
  }, {});

  Object.keys(allProducts).forEach((prodGroup) => {
    let prodId = uniqid('','-prodID');
    Object.keys(allProducts[prodGroup]).forEach((prodSingle) => {
      allProducts[prodGroup][prodSingle]._source.product_id = prodId;
      finalProducts.push({...allProducts[prodGroup][prodSingle]})
    });
  });

  return finalProducts;
}


let template = {
  _index: "product_variant_custom",
  _type: "_doc",
  _id: '', //
  _source: {
    id: '',
    title: "", //
    price: 0, //
    created_at: "", //
    updated_at: "", //
    levar_user_account_id: "9a219350-f35b-4284-9a00-2cceae2bf262", //
    product_title: "", //
    product_vendor: "", //
    product_type: "", //
    product_id: '',
    image_url: {
      src: "", //
    },
    store_url: "",
    custom_asset_status: false,
    sales_rank: 0,
    total_sales: 0,
    order_count: 0,
    returns_rank: 0,
    total_refunds: 0,
    asset_stage: 0,
  }
}


//
// const hanldeOrganize = (products) => {
//     let productsSorted = products.reduce((acc, prod) => {
//       if (!acc[prod['product_id']]) { acc[prod['product_id']] = []; }
//       acc[prod['product_id']].push(prod);
//       return acc;
//     }, {});
//
//     return Object.keys(productsSorted).reduce((acc, groupedProducts) => {
//         acc.push(productsSorted[groupedProducts])
//         return acc
//     }, []);
//  }


    // let topProducts = productSort.sort((a, b) => {
    //   return b.sales_rank - a.sales_rank;
    // })
// }
//
// const result = cohorts.reduce((acc, cohort) => {
//
//   cohort.curriculum.forEach(sub => {
//     acc[sub] = instructors.reduce((acc, teach) => {
//       if(teach.teaches.includes(sub)){
//         acc.push(teach.name);
//       }
//       return acc;
//     },[]);
//   });
//   return acc;
//
// },{});



// {
//   "_index": "product_variant_shopify",
//   "_type": "_doc",
//   "_id": "31106844426274",
//   "_version": 1,
//   "_score": 0,
//   "_source": {
//     "id": 31106844426274,
//     "title": "Default Title",
//     "price": "75.00",
//     "sku": "",
//     "position": 1,
//     "inventory_policy": "deny",
//     "compare_at_price": null,
//     "fulfillment_service": "manual",
//     "inventory_management": "shopify",
//     "option1": "Default Title",
//     "option2": null,
//     "option3": null,
//     "created_at": "2019-11-05T20:09:02-06:00",
//     "updated_at": "2020-02-10T13:33:58-06:00",
//     "taxable": true,
//     "barcode": "",
//     "grams": 0,
//     "image_id": null,
//     "weight": 0,
//     "weight_unit": "lb",
//     "inventory_item_id": 32606145773602,
//     "inventory_quantity": 3,
//     "old_inventory_quantity": 3,
//     "requires_shipping": true,
//     "admin_graphql_api_id": "gid://shopify/ProductVariant/31106844426274",
//     "levar_user_account_id": "9a219350-f35b-4284-9a00-2cceae2bf262",
//     "product_title": "Converse Pride 2019 Hightop",
//     "product_vendor": "Converse",
//     "product_type": "Shoes",
//     "product_id": 4332003917858,
//     "image_url": {
//       "id": 13384731361314,
//       "position": 1,
//       "created_at": "2019-11-05T20:09:02-06:00",
//       "updated_at": "2019-11-05T20:09:02-06:00",
//       "alt": null,
//       "width": 497,
//       "height": 357,
//       "src": "https://cdn.shopify.com/s/files/1/0275/9652/1506/products/pride.png?v=1573006142",
//       "variant_ids": [],
//       "admin_graphql_api_id": "gid://shopify/ProductImage/13384731361314"
//     },
//     "store_url": "converse-ar.myshopify.com",
//     "shopify_asset_status": false,
//     "sales_rank": 0,
//     "total_sales": 0,
//     "order_count": 0,
//     "returns_rank": 0,
//     "total_refunds": 0
//   },
//   "fields": {
//     "created_at": [
//       "2019-11-06T02:09:02.000Z"
//     ],
//     "image_url.updated_at": [
//       "2019-11-06T02:09:02.000Z"
//     ],
//     "updated_at": [
//       "2020-02-10T19:33:58.000Z"
//     ],
//     "image_url.created_at": [
//       "2019-11-06T02:09:02.000Z"
//     ]
//   },
//   "highlight": {
//     "levar_user_account_id.keyword": [
//       "@kibana-highlighted-field@9a219350-f35b-4284-9a00-2cceae2bf262@/kibana-highlighted-field@"
//     ],
//     "levar_user_account_id": [
//       "@kibana-highlighted-field@9a219350@/kibana-highlighted-field@-@kibana-highlighted-field@f35b@/kibana-highlighted-field@-@kibana-highlighted-field@4284@/kibana-highlighted-field@-@kibana-highlighted-field@9a00@/kibana-highlighted-field@-@kibana-highlighted-field@2cceae2bf262@/kibana-highlighted-field@"
//     ]
//   }
// }

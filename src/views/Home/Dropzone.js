import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';

import Papa from 'papaparse';

const baseStyle = {
  // flex: 1,
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // padding: '20px',
  // borderWidth: 2,
  // borderRadius: 2,
  // borderColor: '#eeeeee',
  // borderStyle: 'dashed',
  // backgroundColor: '#fafafa',
  // color: '#bdbdbd',
  // outline: 'none',
  // transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#000000'
};

const acceptStyle = {
  borderColor: '#2196F3'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Dropzone = () => {
  const [file, setFile] = useState(null)
  const [fileLoaded, setFileLoaded] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    Papa.parse(acceptedFiles[0], {
      header: true,
      complete: updateData
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: 'text/csv', noClick: false, onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
    }), [
    isDragActive,
    isDragReject
  ]);

  const submitFile = (e) => {
    e.preventDefault();
    console.log('button clicked');
  }

  const updateData = async (result) => {
    let data = result.data;
    console.log(data);

    // let options = {
    //   method: 'PUT',
    //   headers: {'Content-type': 'application/json'},
    //   body: JSON.stringify(data)
    // }
    //
    // try {
    //   const response = await fetch("http://localhost:3001/upload", options)
    //   if(!response.ok) { throw new Error(`Fetch Call Cannot Be Made`)}
    //   let dataResponse = await response.json();
    //   console.log(dataResponse);
    // } catch (error) {
    //   console.log('error', error.message);
    // }
  }

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="container">
      <section className="File-DropContainer">
        <div className="File-Drop" {...getRootProps({style})}>
          <input {...getInputProps()} />
          <CloudUploadIcon style={{ fontSize: 80 }}  />
          <h4>Drag 'n' drop some file here</h4>
        </div>
      </section>
      <button className="ButtonLoad"
             onClick={submitFile}
             disabled={fileLoaded ? false : true}>
             Submit
      </button>
    </div>
  )
}

export default Dropzone
//
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

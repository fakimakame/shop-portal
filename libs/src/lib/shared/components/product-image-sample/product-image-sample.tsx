import styles from './product-image-sample.module.scss';

/* eslint-disable-next-line */
export interface ProductImageSampleProps {
  img: string,
  // title?: string;
  // subtitle?: string;
  // actionButtonData?: ActionButton[];
  id: any;
  onActionClick?: any;
  data?: any
  quantity?: any
}

export function ProductImageSample(props: ProductImageSampleProps) {
  return (
    <a key={props.id} href="#" className="group">
              <div className="tw-w-40 tw-h-48 tw-overflow-hidden tw-rounded-lg tw-bg-gray-200 ">
                <img
                  alt={props.id}
                  src={props.img}
                  className="tw-h-full tw-w-full  group-hover:tw-opacity-75"
                />
              </div>
              <p className="tw-text-sm tw-font-medium tw-text-gray-700">{"size"}</p>
              <p className="tw-text-sm tw-font-medium tw-text-gray-900">{"quantity"}</p>
            </a>
  );
}

export default ProductImageSample;

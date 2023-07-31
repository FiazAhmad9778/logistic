import { Feature, LocationSearchResponse } from '@/infrastructure/store/api/mapbox/mapbox-types';
import React from 'react';

interface Props {
  searchData: LocationSearchResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnClick: (data: Feature) => any;
  suggestionBox?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchResultBox: React.FC<Props> = ({ searchData, handleOnClick, suggestionBox }): any => {
  return (
    <>
      {
        <div
          className={`position-absolute w-100 overflow-hidden rounded bg-white z-index border ${
            suggestionBox ? 'block' : 'none'
          } group-hover:block`}
        >
          {searchData?.features?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => handleOnClick(data)}
                onKeyPress={() => handleOnClick(data)}
                role="link"
                tabIndex={0}
                className="cursor-pointer py-2 px-3"
                // className="cursor-pointer py-2 px-3 hover:bg-slate-200"
              >
                <p className="tx-12 tx-medium tx-gray-600">{data.text}</p>
                <p className="tx-12 tx-gray-500">{data.place_name}</p>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default SearchResultBox;

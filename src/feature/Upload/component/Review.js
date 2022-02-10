import React, { useState } from "react";

export default function Review() {
  const [ReviewImg, setReviewImg] = useState();
  return (
    <div className="review text-center mt-5">
      <div className="mb-5">
        <div className="fs-5">Mục</div>
        <input
          type="text"
          className="input-review data-review-title"
          placeholder="Nhập chỉ mục. vd: 1,Mở đầu"
        />
      </div>
      <div className="fs-5">Review</div>
      <textarea
        name=""
        className="area-review mb-5 data-review-words"
        placeholder="Trải nghiệm của bạn với cuốn sách...."
      ></textarea>
      <div className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <div>Ảnh miêu tả</div>
              <textarea
                type="text"
                placeholder="có thể có hoặc không (Link ảnh)"
                className="input-review data-review-image"
                style={{ height: "150px" }}
                onChange={(e) => {
                  setReviewImg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <img src={ReviewImg} alt="" className="img-review " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

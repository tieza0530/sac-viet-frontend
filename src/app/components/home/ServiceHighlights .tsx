"use client"
export const ServiceHighlights = () => {
    return (
        <div className="grid grid-cols-4 gap-2  py-20 text-[var(--color-text-root)]">
            <div className="bg-[var(--color-background-main)] flex justify-center items-center rounded-xs">
                <span className="p-6">Hỗ trợ giao hàng tận nhà</span>
            </div>
            <div className="bg-[var(--color-background-main)] flex justify-center items-center  rounded-xs">
                <span>Đổi trả <strong>MIỄN PHÍ</strong> <br /> Trong vòng <strong>15 NGÀY</strong></span>
            </div>
            <div className="bg-[var(--color-background-main)] flex justify-center items-center  rounded-xs">
                <span>Tiến hành <strong>THANH TOÁN</strong> <br /> Với nhiều <strong>PHƯƠNG THỨC</strong></span></div>
            <div className="bg-[var(--color-background-main)] flex justify-center items-center  rounded-xs">
                <span><strong>100% HOÀN TIỀN </strong><br /> nếu sản phẩm lỗi</span></div>
        </div>

    )
}
import React, { useState } from "react";
import { Button, Input, Table, Checkbox } from "antd";

const ThietLapMucTieu: React.FC = () => {
    const [mucTieu, setMucTieu] = useState<{ mon: string; thoiLuong: number; hoanThanh: boolean }[]>([]);
    const [mon, setMon] = useState("");
    const [thoiLuong, setThoiLuong] = useState<number | undefined>(undefined);
  
    const handleThemMucTieu = () => {
      if (mon && thoiLuong) {
        setMucTieu([...mucTieu, { mon, thoiLuong, hoanThanh: false }]);
        setMon("");
        setThoiLuong(undefined);
      }
    };
  
    const columns = [
      { title: "Môn Học", dataIndex: "mon", key: "mon" },
      { title: "Thời Lượng (giờ)", dataIndex: "thoiLuong", key: "thoiLuong" },
      {
        title: "Trạng Thái",
        key: "hoanThanh",
        render: (_: any, record: { hoanThanh: boolean | undefined; }, index: number) => (
          <Checkbox
            checked={record.hoanThanh}
            onChange={(e) => {
              const newMucTieu = [...mucTieu];
              newMucTieu[index].hoanThanh = e.target.checked;
              setMucTieu(newMucTieu);
            }}
          >
            {record.hoanThanh ? "Hoàn thành" : "Chưa hoàn thành"}
          </Checkbox>
        ),
      },
    ];
  
    return (
      <div>
        <h3>Thiết Lập Mục Tiêu Học Tập</h3>
        <Input
          value={mon}
          onChange={(e) => setMon(e.target.value)}
          placeholder="Tên môn học"
          style={{ width: 200, marginRight: 10 }}
        />
        <Input
          type="number"
          value={thoiLuong}
          onChange={(e) => setThoiLuong(Number(e.target.value))}
          placeholder="Thời lượng (giờ)"
          style={{ width: 150, marginRight: 10 }}
        />
        <Button type="primary" onClick={handleThemMucTieu}>
          Thêm Mục Tiêu
        </Button>
        <Table dataSource={mucTieu.map((mt, index) => ({ key: index, ...mt }))} columns={columns} style={{ marginTop: 20 }} />
      </div>
    );
  };
  
  export default ThietLapMucTieu;
  
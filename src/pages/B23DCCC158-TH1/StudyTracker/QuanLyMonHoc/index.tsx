import React, { useState } from "react";
import { Button, Input, Modal, Table } from "antd";

const QuanLyMonHoc: React.FC = () => {
    const [monHoc, setMonHoc] = useState<string[]>([]);
    const [tenMon, setTenMon] = useState("");
    const [editingMon, setEditingMon] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");
  
    const themMonHoc = () => {
      if (tenMon.trim() !== "") {
        setMonHoc([...monHoc, tenMon]);
        setTenMon("");
      }
    };
  
    const xoaMonHoc = (tenMon: string) => {
      setMonHoc(monHoc.filter((mon) => mon !== tenMon));
    };
  
    const suaMonHoc = (mon: string) => {
      setEditingMon(mon);
      setEditingValue(mon);
    };
  
    const luuMonHoc = () => {
      if (editingMon && editingValue.trim() !== "") {
        setMonHoc(monHoc.map((mon) => (mon === editingMon ? editingValue : mon)));
      }
      setEditingMon(null);
    };
  
    const columns = [
      { title: "Môn Học", dataIndex: "mon", key: "mon" },
      {
        title: "Hành động",
        key: "action",
        render: (_: any, record: { mon: string; }) => (
          <>
            <Button onClick={() => suaMonHoc(record.mon)} style={{ marginRight: 5 }}>
              Sửa
            </Button>
            <Button type="primary" danger onClick={() => xoaMonHoc(record.mon)}>
              Xóa
            </Button>
          </>
        ),
      },
    ];
  
    return (
      <div className="quan-ly-mon-hoc">
        <h3>Quản lý Môn Học</h3>
        <Input
          value={tenMon}
          onChange={(e) => setTenMon(e.target.value)}
          placeholder="Nhập tên môn học"
          style={{ width: 300, marginRight: 10 }}
        />
        <Button type="primary" onClick={themMonHoc}>
          Thêm Môn
        </Button>
        <Table
          dataSource={monHoc.map((mon, index) => ({ key: index, mon }))}
          columns={columns}
          style={{ marginTop: 20 }}
        />
        <Modal
          title="Sửa Môn Học"
          visible={!!editingMon}
          onOk={luuMonHoc}
          onCancel={() => setEditingMon(null)}
        >
          <Input
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
          />
        </Modal>
      </div>
    );
  };

export default QuanLyMonHoc;

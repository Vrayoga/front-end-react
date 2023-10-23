import { Container, Row, Col, Modal, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mahasiswa() {
  const [mhs, setMhs] = useState([]);
  const [jrs, setJrsn] = useState([]);
  const [show, setShow] = useState(false); 
  const [nama, setNama] = useState("");
  const [nrp, setNrp] = useState("");
  const [id_jurusan, setIdJurusan] = useState("");
  const [gambar, setGambar] = useState(null);
  const [swa_foto, setSwafoto] = useState(null);
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const url = "http://localhost:3000/static/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response1 = await axios.get("http://localhost:3000/api/mhs/");
    const data1 = await response1.data.data;
    setMhs(data1);

    const response2 = await axios.get("http://localhost:3000/api/jurusan/");
    const data2 = await response2.data.data;
    setJrsn(data2);
  };

  const handleShow = () => setShow(true);

  const handleClose = () => {
    console.log("modal is closing ");
    setShow(false);
  };

  const handleNamaChange = (e) => {
    setNama(e.target.value);
  };

  const handleNrpChange = (e) => {
    setNrp(e.target.value); 
  };

  const handleIdJurusanChange = (e) => {
    setIdJurusan(e.target.value);
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
  };

  const handleSwaFotoChange = (e) => {
    const file = e.target.files[0];
    setSwafoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("nrp", nrp);
    formData.append("id_jurusan", id_jurusan);
    formData.append("gambar", gambar);
    formData.append("swa_foto", swa_foto);
    try {
      await axios.post("http://localhost:3000/api/mhs/store/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/mhs");
      fetchData();
    } catch (error) {
      console.error("kesalahan :", error);
      setValidation(error.response.data);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Data Mahasiswa</h2>
        </Col>
        <button variant="primary" onClick={handleShow}>
          Tambah
        </button>
      </Row>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Jurusan</th>
            <th scope="col">Gambar 1</th>
            <th scope="col">Gambar 2</th>
          </tr>
        </thead>
        <tbody>
          {mhs.map((mh, index) => (
            <tr key={mh.id}>
              <td>{index + 1}</td>
              <td>{mh.nama}</td>
              <td>{mh.nama_jurusan}</td>
              <td>
                <img src={url + mh.gambar} height="100" alt="Gambar 1" />
              </td>
              <td>
                <img src={url + mh.swa_foto} height="100" alt="Gambar 2" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Row>
        <Table striped bordered hover>
          {/* Tabel Mahasiswa */}
        </Table>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama:</label>
              <input
                type="text"
                className="form-control"
                value={nama}
                onChange={handleNamaChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">NRP:</label>
              <input
                type="text"
                className="form-control"
                value={nrp}
                onChange={handleNrpChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Jurusan:</label>
              <select
                className="form-select"
                value={id_jurusan}
                onChange={handleIdJurusanChange}
              >
                {jrs.map((jr) => (
                  <option key={jr.id_j} value={jr.id_j}>
                    {jr.nama_jurusan}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Gambar:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleGambarChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Swa Foto:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleSwaFotoChange}
              />
            </div>
            <button
              onClick={handleClose}
              type="submit"
              className="btn btn-primary"
            >
              Kirim
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Mahasiswa;




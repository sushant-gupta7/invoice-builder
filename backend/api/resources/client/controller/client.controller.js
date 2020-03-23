import Clients from "../../client/model/client.model";
import clientService from '../service/client.sevice';

export default {
  findAll(req, res) {
    const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10)
    };

    const query = {};
    if (filter) {
      query.firstName = {
        $regex: filter
      };
    }

    if (sortField && sortDir) {
      options.sort = {
        [sortField]: sortDir
      };
    }

    Clients.paginate(query, options)
      .then(docs => {
        res.status(200).json({ message: "all Clients", data: docs });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
      });
  },

  findAllForOthers(req,res) {
    Clients.find()
      .then(docs => {
        res.status(200).json({ message: "all Clients", data: docs });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
      });
  },

  async create(req, res) {
    const { value, error } = clientService.validateClientCreateSchema(req.body);
    if (error && error.details) {
      return res.status(400).json({ error: error });
    }
    await  Clients.create(value)
      .then(client => {
        return res.status(200).json({ data: client });
      })
      .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      });
  },
  update(req, res) {
    const { value, error } = clientService.validateClientUpdateSchema(req.body);
    if (error && error.details) {
      return res.status(400).json({ error: error });
    }
    Clients.findByIdAndUpdate({ _id: req.params.id }, value, { new: true })
      .then(client => {
        return res.status(200).json({ data: client });
      })
      .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      });
  },
  findId(req, res) {
    let id = req.params.id;
    Clients.findById(id)
      .then(doc => {
        return res.status(200).json({ data: doc });
      })
      .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      });
  },
  deleteId(req, res) {
    let id = req.params.id;
    Clients.findByIdAndDelete(id)
      .then(doc => {
        return res.status(200).json({ data: doc });
      })
      .catch(err => {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      });
  }
};

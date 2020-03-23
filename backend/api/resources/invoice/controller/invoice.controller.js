import Invoices from "../../invoice/model/invoice.model";
import invoiceService from "../../invoice/service/invoice.service";

export default {
  findAll(req, res) {
    const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      populate: "client"
    };

    const query = {};
    if (filter) {
      query.item = {
        $regex: filter
      };
    }

    if (sortField && sortDir) {
      options.sort = {
        [sortField]: sortDir
      };
    }

    Invoices.paginate(query, options)
      .then(docs => {
        res.status(200).json({ message: "all invoices", data: docs });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
      });
  },
  async create(req, res) {
    const { value, error } = invoiceService.validateInvoiceCreateSchema(
      req.body
    );
    if (error && error.details) {
      return res.status(400).json({ error: error });
    }
    await Invoices.create(value)
      .then(invoice => {
        invoice
          .populate("client")
          .execPopulate()
          .then(invoice => {
            return res.status(200).json({ data: invoice });
          });
      })
      .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      });
  },
  update(req, res) {
    const { value, error } = invoiceService.validateInvoiceUpdateSchema(
      req.body
    );
    if (error && error.details) {
      return res.status(400).json({ error: error });
    }
    Invoices.findByIdAndUpdate({ _id: req.params.id }, value, { new: true })
      .populate("client")
      .then(invoice => {
        return res.status(200).json({ data: invoice });
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
    console.log(id);
    Invoices.findById(id)
      .populate("client")
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
    console.log(id);
    Invoices.findByIdAndDelete(id)
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

export const PaginatePlugin = (schema, options) => {
  options = options || {};
  schema.query.paginate = async function (params) {
    const pagination = {
      limit: options.limit || 24,
      page: 1,
      totalPage: 0,
      count: 0,
    };
    pagination.limit = parseInt(params.limit) || pagination.limit;
    const page = parseInt(params.page);
    pagination.page = page > 0 ? page : pagination.page;
    const offset = (pagination.page - 1) * pagination.limit;

    const [data, count] = await Promise.all([
      this.limit(pagination.limit).skip(offset),
      this.model.countDocuments(this.getQuery()),
    ]);
    pagination.count = count;
    pagination.totalPage = Math.ceil(count / pagination.limit);
    return { data, pagination };
  };
};

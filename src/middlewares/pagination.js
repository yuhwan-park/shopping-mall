async function pagination(total, page, perPage) {
  const sorted = await total.sort((a, b) => b.updatedAt - a.updatedAt);
  const startIndex = (page - 1) * perPage;
  const pageLimit = page * perPage;
  const endIndex = sorted.length > pageLimit ? pageLimit : sorted.length;
  const posts = await sorted.slice(startIndex, endIndex);
  const totalPage = Math.ceil(total / perPage);
  return { totalPage, posts };
}

export { pagination };

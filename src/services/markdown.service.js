("use strict");
import {
    createNewMarkdown,
} from "../models/repository/markdown.repo";

class MarkdownService {
  static createMarkdown = async (data) => {
    return await createNewMarkdown(data);
  };

}

module.exports = MarkdownService;

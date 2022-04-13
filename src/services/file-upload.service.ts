// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  BindingScope,
  config,
  ContextTags,
  injectable,
  Provider
} from '@loopback/core';
import multer from 'multer';
import {FILE_UPLOAD_SERVICE} from '../keys';
import {FileUploadHandler} from '../types';
/**
 * A provider to return an `Express` request handler from `multer` middleware
 */
@injectable({
  scope: BindingScope.TRANSIENT,
  tags: {[ContextTags.KEY]: FILE_UPLOAD_SERVICE},
})
export class FileUploadProvider implements Provider<FileUploadHandler> {
  constructor(@config() private options: multer.Options = {}) {
    console.log("DirName", __dirname)
    if (!this.options.storage) {
      this.options.storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
        }
      })

      // Default to in-memory storage
      // this.options.storage = multer.diskStorage({
      //   destination: function (req, file, cb) {
      //     let dest = path.join(__dirname);
      //     let stat = null;
      //     try {
      //       stat = fs.statSync(dest);
      //     }
      //     catch (err) {
      //       fs.mkdirSync(dest);
      //     }
      //     if (stat && !stat.isDirectory()) {
      //       throw new Error('Directory cannot be created');
      //     }
      //     console.log("Check your destination", dest)
      //     cb(null, Date.now() + file.originalname);
      //   }
      // });
    }
  }

  value(): FileUploadHandler {
    return multer(this.options).any();
  }
}

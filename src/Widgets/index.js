import ButtonWidget, { json_object as ButtonJSON } from './Button/Button';
import TypographyWidget from './Typography';
import TextWidget from './Text';
import GridWidget from './Grid';
import BoxWidget from './Box';
import ContainerWidget from './Container';
import FormWidget from './Form';
import TextFieldWidget from './TextField';
import BackdropWidget from './Backdrop/Backdrop';
import SelectFieldWidget from './Select/SelectField';
import ImageUploadWidget from './ImageUpload';
import FileUploadWidget from './FileUpload';

// eslint-disable-next-line
export default {
  Button: ButtonWidget,
  ButtonJSON,
  Typography: TypographyWidget,
  Text: TextWidget,
  Grid: GridWidget,
  Box: BoxWidget,
  Container: ContainerWidget,
  Form: FormWidget,
  TextField: TextFieldWidget,
  SelectField: SelectFieldWidget,
  Backdrop: BackdropWidget,
  ImageUpload: ImageUploadWidget,
  FileUpload: FileUploadWidget,
};

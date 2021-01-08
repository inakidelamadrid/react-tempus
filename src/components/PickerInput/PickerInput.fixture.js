import PickerInput, { ICON_POSITION } from './PickerInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fixture = {
  default: <PickerInput />,
  autofocus: <PickerInput autofocus />,
  disabled: <PickerInput disabled />,
  readonly: <PickerInput readonly />,
  'custom placeholder': <PickerInput placeholder="Pick a time" />,
  'custom icon': <PickerInput icon={<FontAwesomeIcon icon="clock" />} />,
  'custom icon on the right': (
    <PickerInput
      icon={<FontAwesomeIcon icon="clock" />}
      iconPosition={ICON_POSITION.RIGHT}
    />
  ),
}

export default fixture

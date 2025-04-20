import Icon from "@mdi/react";
import {
  mdiPhone,
  mdiEmailOutline,
  mdiEmailOffOutline,
  mdiPhoneOff,
} from "@mdi/js";

const EmailPhoneButtons = (phone_number, email) => {
  return (
    <>
      {phone_number ? (
        <a href={`tel:${phone_number}`}>
          <button>
            <Icon path={mdiPhone} color="rgb(59 130 246)" size={1.4} />
          </button>
        </a>
      ) : (
        <button>
          <Icon path={mdiPhoneOff} color="gray" size={1.4} />
        </button>
      )}
      {email ? (
        <a href={`mailto:${email}`}>
          <button>
            <Icon path={mdiEmailOutline} color="rgb(59 130 246)" size={1.4} />
          </button>
        </a>
      ) : (
        <button>
          <Icon path={mdiEmailOffOutline} color="gray" size={1.4} />
        </button>
      )}
    </>
  );
};
export default EmailPhoneButtons;

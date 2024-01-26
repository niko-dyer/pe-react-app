import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { User } from "../../../models/User";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormInputText } from "../../Shared/FormInputText";
import "./CreateUpdateUserDialog.scss";

export default function CreateUpdateUserDialog({
  row,
  table,
  action,
  actionFn,
}: any) {
  const defaultUser = {
    id: "",
    displayId: 0,
    fullName: "",
    title: "",
    department: "",
    role: "",
    phoneNumber: "",
    email: "",
  };

  const handleClose = () => {
    switch (action) {
      case "Edit":
        table.setEditingRow(null);
        break;
      case "Create":
        table.setCreatingRow(null);
        break;
      default:
        break;
    }
  };

  const dialogTitle: string = action + " User";

  const onSubmit: SubmitHandler<User> = (data) => {
    actionFn(action, data);
    handleClose();
  };

  let user = defaultUser;
  if (row) {
    const userFromRow = row.original as User;
    user = {
      id: userFromRow.id ?? "",
      displayId: userFromRow.displayId ?? 0,
      fullName: userFromRow.fullName ?? "",
      title: userFromRow.title ?? "",
      department: userFromRow.department ?? "",
      role: userFromRow.role ?? "",
      phoneNumber: userFromRow.phoneNumber ?? "",
      email: userFromRow.email ?? "",
    };
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...user,
    } as User,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <div className="dialog-input">
            <FormInputText
              name="fullName"
              label="Full Name"
              control={control}
            />
          </div>
          <div className="dialog-input">
            <FormInputText name="title" label="Title" control={control} />
          </div>
          <div className="dialog-input">
            <FormInputText
              name="department"
              label="Department"
              control={control}
            />
          </div>
          <div className="dialog-input">
            <Controller
              control={control}
              name="role"
              rules={{ required: { value: true, message: "Invalid input" } }}
              render={({ field: { name, value, onChange } }) => (
                <TextField
                  sx={{ width: "100%" }}
                  value={value}
                  onChange={onChange}
                  select
                  required={true}
                  label="Role"
                >
                  <MenuItem key={1} value="Admin">
                    Admin
                  </MenuItem>
                  <MenuItem key={2} value="Volunteer">
                    Volunteer
                  </MenuItem>
                </TextField>
              )}
            />
          </div>
          <div className="dialog-input">
            <FormInputText
              name="phoneNumber"
              label="Phone Number"
              control={control}
            />
          </div>
          <div className="dialog-input">
            <FormInputText name="email" label="Email" control={control} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

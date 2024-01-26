import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { Component } from "react";
import "./InventoryAdd.scss";
import { Delete } from "@mui/icons-material";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FormInputText } from "../Shared/FormInputText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../global/Header.js";
import { DeviceAPI } from "../../apis/InventoryApi";
import { Device } from "../../models/Device";
import { useNavigate } from "react-router-dom";

interface InventoryChangeFormProps {
  //campaignName: string;
  //dropOffLocation: string;
  //additionalInfo: string;
  additions: Array<Device>;
  deletions: Array<Device>;
}

const InventoryChangeForm = () => {
  const navigate = useNavigate();

  const updateInventory = async (data?: any) => {
    await DeviceAPI.update(data);
  };

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      //campaignName: "",
      //dropOffLocation: "",
      //additionalInfo: "",
      additions: [
        {
          id: 0,
          category: "",
          type: "",
          size: "",
          count: 0,
          grade: "",
          location: "",
          campaign: undefined,
        },
      ],
      deletions: [
        {
          id: 0,
          category: "",
          type: "",
          size: "",
          count: 0,
          grade: "",
          location: "",
          campaign: undefined,
        },
      ],
    } as InventoryChangeFormProps,
  });

  const additionsFieldArray = useFieldArray({
    control,
    name: "additions",
  });

  const appendItemForAddForm = () => {
    additionsFieldArray.append({
      id: 0,
      category: "",
      type: "",
      size: "",
      count: 0,
      grade: "",
      location: "",
      campaign: undefined,
    });
  };

  const removeItemForAddForm = (index: number) => {
    additionsFieldArray.remove(index);
  };

  const deletionsFieldArray = useFieldArray({
    control,
    name: "deletions",
  });

  const appendItemForRemoveForm = () => {
    deletionsFieldArray.append({
      id: 0,
      category: "",
      type: "",
      size: "",
      count: 0,
      grade: "",
      location: "",
      campaign: undefined,
    });
  };

  const removeItemForRemoveForm = (index: number) => {
    deletionsFieldArray.remove(index);
  };

  const onSubmit: SubmitHandler<InventoryChangeFormProps> = (data) => {
    try {
      updateInventory(data);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="inventory-container">
        {/*<Paper className="form-section section-container">*/}
        {/*    <h2 className="section-title campaign-title">Campaign Information</h2>*/}
        {/*    <div className="centered-full-width-row">*/}
        {/*    <div className="smaller-input-container">*/}
        {/*        <FormInputText*/}
        {/*        className="campaign-input"*/}
        {/*        name="campaignName"*/}
        {/*        label="Campaign Name"*/}
        {/*        control={control}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className="smaller-input-container">*/}
        {/*        <FormInputText*/}
        {/*        className="campaign-input"*/}
        {/*        name="dropOffLocation"*/}
        {/*        label="Drop-off Location"*/}
        {/*        control={control}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className="campaign-input">*/}
        {/*        <Controller*/}
        {/*        control={control}*/}
        {/*        name="additionalInfo"*/}
        {/*        defaultValue=""*/}
        {/*        render={({ field: { name, value, onChange } }) => (*/}
        {/*            <TextField*/}
        {/*            fullWidth*/}
        {/*            name={name}*/}
        {/*            value={value}*/}
        {/*            onChange={onChange}*/}
        {/*            label="Additional Information"*/}
        {/*            multiline*/}
        {/*            rows={4}*/}
        {/*            />*/}
        {/*        )}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    </div>*/}
        {/*</Paper>*/}
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 className="section-title">Add Items</h2>
          </AccordionSummary>
          <AccordionDetails className="item-inputs">
            {additionsFieldArray.fields.map((field, index) => (
              <div className="item-row" key={field.id}>
                <div className="item-info-container">
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Category"
                      {...register(`additions.${index}.category` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Type"
                      key={field.id}
                      {...register(`additions.${index}.type` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      fullWidth
                      label="Size"
                      key={field.id}
                      {...register(`additions.${index}.size` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Grade"
                      key={field.id}
                      {...register(`additions.${index}.grade` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Quantity"
                      key={field.id}
                      {...register(`additions.${index}.count` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Location"
                      key={field.id}
                      {...register(`additions.${index}.location` as const)}
                    />
                  </div>
                </div>
                <Tooltip title="Delete">
                  <div>
                    <IconButton
                      disabled={
                        deletionsFieldArray.fields.length === 0 &&
                        additionsFieldArray.fields.length === 1
                      }
                      onClick={() => {
                        removeItemForAddForm(index);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </Tooltip>
              </div>
            ))}
            <Container maxWidth="lg" className="item-button-container">
              <Button
                onClick={appendItemForAddForm}
                color="primary"
                variant="contained"
              >
                Add Item
              </Button>
            </Container>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 className="section-title">Remove Items</h2>
          </AccordionSummary>
          <AccordionDetails className="item-inputs">
            {deletionsFieldArray.fields.map((field, index) => (
              <div className="item-row" key={field.id}>
                <div className="item-info-container">
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Category"
                      {...register(`deletions.${index}.category` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Type"
                      key={field.id}
                      {...register(`deletions.${index}.type` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      fullWidth
                      label="Size"
                      key={field.id}
                      {...register(`deletions.${index}.size` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Grade"
                      key={field.id}
                      {...register(`deletions.${index}.grade` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Quantity"
                      key={field.id}
                      {...register(`deletions.${index}.count` as const)}
                    />
                  </div>
                  <div className="item-input">
                    <TextField
                      required
                      fullWidth
                      label="Location"
                      key={field.id}
                      {...register(`deletions.${index}.location` as const)}
                    />
                  </div>
                </div>
                <Tooltip title="Delete">
                  <div>
                    <IconButton
                      disabled={
                        deletionsFieldArray.fields.length === 1 &&
                        additionsFieldArray.fields.length === 0
                      }
                      onClick={() => {
                        removeItemForRemoveForm(index);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </Tooltip>
              </div>
            ))}
            <Container maxWidth="lg" className="item-button-container">
              <Button
                onClick={appendItemForRemoveForm}
                color="primary"
                variant="contained"
              >
                Add Item
              </Button>
            </Container>
          </AccordionDetails>
        </Accordion>
        <Container maxWidth="lg" className="submit-button-container">
          <Button size="large" variant="contained" type="submit">
            Submit
          </Button>
        </Container>
      </div>
    </form>
  );
};
export default class InventoryAdd extends Component {
  render() {
    return (
      <>
        <Header title="Update Inventory" />
        <div className="page-container">
          <div className="table-title">
            <InventoryChangeForm></InventoryChangeForm>
          </div>
        </div>
      </>
    );
  }
}

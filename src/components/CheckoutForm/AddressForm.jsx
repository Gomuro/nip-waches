import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Typography variant="body2" gutterBottom>
        All data in English, please.
      </Typography>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput
              required
              name="firstName"
              label="First name"
              errors={methods.formState.errors}
              {...methods.register("firstName", {
                required: { value: true, message: "First name is required" },
                maxLength: {
                  value: 30,
                  message: "First name must be at least 30 characters",
                },
                pattern: {
                  value: /^([^0-9]*)$/,
                  message: "First name must be without numbers",
                },
              })}
            />

            <FormInput
              required
              name="lastName"
              label="Last name"
              errors={methods.formState.errors}
              {...methods.register("lastName", {
                required: { value: true, message: "Last name is required" },
                maxLength: {
                  value: 30,
                  message: "Last name must be at least 30 characters",
                },
                pattern: {
                  value: /^([^0-9]*)$/,
                  message: "Last name must be without numbers",
                },
              })}
            />
            <FormInput
              required
              name="Address"
              label="Address line"
              errors={methods.formState.errors}
              {...methods.register("address1", {
                required: { value: true, message: "Address is required" },
                maxLength: {
                  value: 30,
                  message: "Address must be at least 30 characters",
                },
              })}
            />
            <FormInput
              required
              name="email"
              label="Email"
              errors={methods.formState.errors}
              {...methods.register("email", {
                required: { value: true, message: "Email is required" },
                maxLength: {
                  value: 50,
                  message: "Email must be at least 50 characters",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Email address is invalid",
                },
              })}
            />
            <FormInput
              required
              name="city"
              label="City"
              errors={methods.formState.errors}
              {...methods.register("city", {
                required: { value: true, message: "City name is required" },
                maxLength: 30,
                pattern: /^([^0-9]*)$/,
              })}
            />
            <FormInput
              required
              name="zip"
              label="Zip / Postal code"
              errors={methods.formState.errors}
              {...methods.register("zip", {
                required: { value: true, message: "Zip code is required" },
                pattern: {
                  value: /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/,
                  message: "Zip code invalid",
                },
              })}
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;

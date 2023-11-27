import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

export default function SelectLocation({ handleSelect }) {
  const [address, setAddress] = useState("");

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(address) => {
        console.log(address);
        setAddress(address);
      }}
      // onSelect={() => handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps()} />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div {...getSuggestionItemProps(suggestion)}>
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

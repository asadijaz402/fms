import { useState, useEffect } from 'react';
import useAuth from './useAuth';

export default function usePermissions(sections) {
  const [list, setList] = useState([]);
  const { isAdmin, permissions } = useAuth();

  const checkPermission = (table, action = false) => {
    table = table.toLowerCase();

    if (action) {
      if (
        permissions.filter(
          (permission) =>
            permission.white_list.filter((row) => row === table).length !== 0 &&
            permission.permission === action
        ).length !== 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        permissions.filter(
          (permission) =>
            permission.white_list.filter((row) => row === table).length !== 0
        ).length !== 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const sectionMapPermissions = (items) => {
    let temp_array = [];
    for (let i = 0, len = items.length; i < len; i++) {
      let row = items[i];
      if (row.display) {
        if (row.items) {
          temp_array = [
            ...temp_array,
            { ...row, items: sectionMapPermissions(row.items) },
          ];
        } else if (row.children) {
          temp_array = [
            ...temp_array,
            { ...row, children: sectionMapPermissions(row.items) },
          ];
        } else {
          temp_array = [...temp_array, row];
        }
      } else {
        if (checkPermission(row.title, row.action ? row.action : false)) {
          if (row.items) {
            temp_array = [
              ...temp_array,
              { ...row, items: sectionMapPermissions(row.items) },
            ];
          } else if (row.children) {
            temp_array = [
              ...temp_array,
              { ...row, children: sectionMapPermissions(row.items) },
            ];
          } else {
            temp_array = [...temp_array, row];
          }
        }
      }
    }
    return temp_array;
  };

  useEffect(() => {
    if (isAdmin) {
      setList(sections);
    } else {
      setList(sectionMapPermissions(sections));
    }
    // eslint-disable-next-line
  }, [sections, isAdmin]);

  return {
    list,
  };
}

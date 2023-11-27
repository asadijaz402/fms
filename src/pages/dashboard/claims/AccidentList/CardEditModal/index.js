import React from 'react';
import {
  Box,
  Dialog,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  SvgIcon,
  Button,
  DialogContent,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Edit as EditIcon } from '@mui/icons-material';
import { XCircle as CloseIcon, CheckSquare as CheckIcon } from 'react-feather';
import Details from './Details';
import Checklist from './Checklist';
import NewComment from './NewComment';
import Comment from './Comment';
import ActionButton from './ActionButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { list_kanaban } from '../../../../../utils/GroupOrdersKanban';
import useCardEditModal from './useCardEditModal';
import { CircularProgress } from '@mui/material';
import { DialogTitle } from '@mui/material';
import ProfileCard from '../../../../../Components/Profilecard/Card';
import TimeLine from './Charts/TimeLine';

const useStyles = makeStyles((theme) => ({
  listName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  checklist: {
    '& + &': {
      marginTop: theme.spacing(3),
    },
  },
}));

function CardEditModal({ rowId }) {
  const classes = useStyles();
  const {
    open,
    handleOpen,
    handleClose,
    value,
    loading,
    handleChange,
    handleAddCheckList,
  } = useCardEditModal(rowId);

  return (
    <>
      <Tooltip title='Edit Claim'>
        <Button
          startIcon={<EditIcon />}
          variant='outlined'
          color='primary'
          size='small'
          onClick={handleOpen}>
          Edit
        </Button>
      </Tooltip>
      <Dialog onClose={handleClose} open={open} maxWidth='md' fullWidth>
        {loading ? (
          <DialogContent>
            <Box style={{ textAlign: 'center' }}>
              <CircularProgress />
            </Box>
          </DialogContent>
        ) : (
          <>
            <DialogTitle>
              <Box display='flex'>
                <Box flexGrow={1}>
                  <Typography variant='body2' color='textSecondary'>
                    Status:{' '}
                    <span className={classes.listName}>{value.status}</span>
                  </Typography>
                  <ProfileCard
                    reg_number={value.vehicle.vehicle_reg_no}
                    vehicle_id={value.vehicle.id}
                  />
                </Box>
                <Box>
                  <IconButton onClick={handleClose}>
                    <SvgIcon>
                      <CloseIcon />
                    </SvgIcon>
                  </IconButton>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box mt={4}>
                <TimeLine data={value.history} />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Details value={value} />
                  {value.notes.checklist &&
                    value.notes.checklist.length > 0 && (
                      <Box mt={5}>
                        {value.notes.checklist.map((checklist) => (
                          <Checklist
                            key={checklist.id}
                            value={value}
                            checklist={checklist}
                            className={classes.checklist}
                          />
                        ))}
                      </Box>
                    )}
                  <Box mt={3}>
                    <Typography variant='h6' color='textPrimary'>
                      Activity
                    </Typography>
                    <Box mt={2}>
                      <NewComment value={value} valueId={value.id} />
                      {value.notes.comments &&
                        value.notes.comments.length > 0 && (
                          <Box mt={3}>
                            {value.notes.comments.map((comment) => (
                              <Comment key={comment.id} comment={comment} />
                            ))}
                          </Box>
                        )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper disableElevation variant='outlined'>
                    <Box p={1}>
                      <ActionButton
                        icon={CheckIcon}
                        onClick={handleAddCheckList}>
                        Checklist
                      </ActionButton>
                      <FormControl fullWidth className={classes.form}>
                        <Typography variant='overline' color='textSecondary'>
                          Breakdown Type
                        </Typography>
                        <Select
                          labelId='label'
                          value={value.status}
                          // value={type.breakdownType=="Open for Action"?"OA":"nothing"}
                          // value={Object.values(list_kanaban).map((val)=>{
                          //   if(type.breakdownType==val.name){
                          //     return val.id;
                          //   }
                          // })}
                          name='status'
                          onChange={handleChange}>
                          {Object.values(list_kanaban).map((key) => {
                            return (
                              <MenuItem value={key.name}>{key.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

export default CardEditModal;

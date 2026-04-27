import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { loadStudents, saveStudents } from '../utils/storage';

const StudentContext = createContext();

const initialState = {
  students: [],
};

function studentReducer(state, action) {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      };

    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.payload),
      };

    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };

    case 'CLEAR_STUDENTS':
      return {
        ...state,
        students: [],
      };

    default:
      return state;
  }
}

export function StudentProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      const savedStudents = await loadStudents();
      dispatch({ type: 'SET_STUDENTS', payload: savedStudents });
      setLoaded(true);
    }

    fetchStudents();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveStudents(state.students);
    }
  }, [state.students, loaded]);

  const value = useMemo(() => ({ state, dispatch, loaded }), [state, loaded]);

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error('useStudents must be used inside StudentProvider');
  }

  return context;
}
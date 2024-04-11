import moment from 'moment';

export const useFormatDate = () => {
  const formatDate = (dateString: string) => {
    return moment(new Date(dateString)).format('YYYY-MM-DD');
  };

  return {
    formatDate,
  };
};

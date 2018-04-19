namespace vegaa.Extensions
{
    public interface IQueryObject
    {
        string SortBy { get; set; }

        bool isSortAscending { get; set; }
    }
}